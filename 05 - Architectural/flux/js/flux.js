// Store: Almacenar el estado de la aplicación

/*
CounterStore (Almacén del Contador):

Esta clase representa el almacén (store) de la aplicación. 
Almacena el estado de la aplicación, en este caso, un contador.

*/
class CounterStore {
    constructor() {

        /*
         Inicializa el estado con un contador en cero y 
         una lista de "escuchadores" (listeners) que serán notificados cuando el estado cambie.
        
        */
      this.state = { count: 0 };
      this.listeners = [];
    }
  
    getState() { //Devuelve el estado actual del contador.
      return this.state;
    }
  
    addChangeListener(listener) { 
    //Agrega una función "escuchadora" al almacén. Estas funciones se ejecutarán cuando el estado cambie.
      this.listeners.push(listener);
    }
  
    removeChangeListener(listener) {

        //Elimina una función "escuchadora" del almacén.
      this.listeners = this.listeners.filter(l => l !== listener);
    }
  
    updateState(newState) {

        /*
        Actualiza el estado del contador y notifica a todos los "escuchadores" que el estado ha cambiado.
        */
      this.state = { ...this.state, ...newState };
      this.notifyChange();
    }
  
    notifyChange() {

        //Notifica a todos los "escuchadores" que el estado ha cambiado.
      this.listeners.forEach(listener => listener(this.state));
    }
  }
  
  // Actions: Describir las acciones

  /*
  Define dos tipos de acciones: INCREMENT y DECREMENT. 
  Estos tipos se utilizan para identificar las acciones que pueden ocurrir en la aplicación.
  */
  const ActionTypes = {

    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT",
  };
  
  // Dispatcher: Manejar la distribución de acciones

  /*
  El despachador es responsable de manejar 
  la distribución de las acciones a los almacenes (stores) correspondientes.
  */
  class Dispatcher {
    constructor() {
      this.callbacks = [];
    }
  
    register(callback) {
        //Permite a las funciones registrarse como manejadores de acciones en el despachador.
      this.callbacks.push(callback);
    }
  
    dispatch(action) {
        //Envía una acción al despachador, que luego la distribuye a los manejadores registrados.
      this.callbacks.forEach(callback => callback(action));
    }
  }
  
  // Crear una instancia del Store
  const counterStore = new CounterStore();
  
  // Función para manejar las acciones

  /*
  Esta función toma una acción como entrada y realiza cambios en el estado del almacén 
  en función del tipo de acción.
-Para el tipo de acción INCREMENT, aumenta el contador en 1.
-Para el tipo de acción DECREMENT, disminuye el contador en 1.
  
  */
  function handleAction(action) {
    switch (action.type) {
      case ActionTypes.INCREMENT:
        counterStore.updateState({ count: counterStore.getState().count + 1 });
        break;
      case ActionTypes.DECREMENT:
        counterStore.updateState({ count: counterStore.getState().count - 1 });
        break;
      default:
        // Acción desconocida
    }
  }
  
  // Registrar la función de manejo de acciones en el Dispatcher
  const dispatcher = new Dispatcher();

  /*
  Registro de la función handleAction en el Dispatcher: 
  Esto se hace para que el Dispatcher sepa cómo manejar las acciones.
  */
  dispatcher.register(handleAction);

  
 /*
 
 Agregamos una función "escuchadora" al almacén del contador que imprime el nuevo estado cuando cambie.
 */
  counterStore.addChangeListener(state => {
    console.log("Nuevo estado:", state);
  });
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
      // Action logger
      const actionLogDiv = document.getElementById("actionLog");
      let actionCount = 0;

      function logAction(action, state) {
        actionCount++;
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span class="log-action">[${actionCount}] Action: ${action.type}</span> → <span class="log-state">State: { count: ${state.count} }</span>`;
        actionLogDiv.insertBefore(entry, actionLogDiv.firstChild);
      }

      // Función para actualizar la vista con el estado actual del contador
      function updateView(state) {
        const counterEl = document.getElementById("counter");
        counterEl.textContent = state.count;
        
        // Add animation
        counterEl.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterEl.style.transform = 'scale(1)';
        }, 200);
      }

      // Agregar la función updateView como escuchadora del almacén del contador
      counterStore.addChangeListener(updateView);

      // Manejar el clic en los botones para despachar las acciones
      document.getElementById("incrementBtn").addEventListener("click", function() {
          const action = { type: ActionTypes.INCREMENT };
          dispatcher.dispatch(action);
          logAction(action, counterStore.getState());
      });

      document.getElementById("decrementBtn").addEventListener("click", function() {
          const action = { type: ActionTypes.DECREMENT };
          dispatcher.dispatch(action);
          logAction(action, counterStore.getState());
      });

      // Inicializar la vista
      updateView(counterStore.getState());
      logAction({ type: 'INIT' }, counterStore.getState());
  });