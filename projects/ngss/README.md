# Ngss

It's a simple Angular library implementing Flux Design pattern. Library allows you to use middleware and decide which implementation of Store you want to use: Rxjs or Signal.

## Getting started

  ### Adding store to **main.ts**  
  ```ts
    import { NGSSStoreModule } from 'ngss'

      bootstrapApplication(AppComponent, {
      providers: [
          importProvidersFrom(BrowserModule, RouterModule.forRoot(appRouting), 
            NGSSStoreModule.forRoot([TestReducer, ShopReducer], {
                middlewares: [],  // Potential list of middlewares
                useSignalStore: true, // Decide if you want yo use signal or observables implementation of store, if not passed observable implementation is used 
            }),
          ),
      ]
  })
  ```
  ### Adding actions  
  *Preferable naming convention (reducer_name).store.actions.ts*
  <br/>
  Example:

  ```ts
    export class AddNumber extends ActionClass<number> {
      override readonly type = "AddNumber";
    }
  ```
  This is example of basic action. You have to Extend *ActionClass*<TypeOfPayload> <br/>
  Defining :
  ```ts
    override readonly type = "AddNumber"
  ```
  Is optional, if not passed ClassedName will be interpreted as type, but remember: <br/>
  **Action type it the only thing which differs handling actions so giving the same type value more than a 1 action can cause unexpected results.**

  ### Creating reducer  
  *Preferable naming convention (reducer_name).store.reducer.ts*
  <br/>
  Example:
  ```ts
  import { Injectable } from "@angular/core";
  import { AddNumber } from "@app/store/testing.store.actions";
  import { ActionHandler, ActionHandlerContext, StoreSignalReducer } from "ngss";
  import { Observable, interval, map, of } from "rxjs";

  export interface TestState {
    value: number;
  }

  const initialState: TestState = {
    value: 0,
  };

  @Injectable({ providedIn: 'root' }) //reducers must be provided in root of application to work correctly
  export class TestReducer extends StoreSignalReducer<TestState> {
    readonly name = "test"; //this is the name thanks to which we get access to data from store. For Example store.test.value
    constructor() {
      super(initialState);
    }

    @ActionHandler(AddNumber)
    addNumber(context: ActionHandlerContext<TestState>, payload: number): void {
      context.patchState({
        value: context.getState().value + payload
      });
    }
  }
  ```
  You can extend **StoreSignalReducer** or **StoreReducer** depending if you want to use signal or rxjs implementation. 
  <br/>
  **Remember! Stores and reducers are fully compatibile and provides same API for user you can mix Signal and rxjs implementation choosing between implementation it's like choosing between LinkedList and ArrayList in Java. It might have a performance issue but not a usability one.**
  
  ### Dispatching action
  To dispatch action you have to inject store, and use dispatch method passing action class instance as na argument:
  ```ts
    constructor(
      private store: Store,
    ) { }

    addValue(value: number) {
      this.store.dispatch(new AddNumber(value));
    }
  ```
  ### Selecting value
  #### Selecting value using store service
  To select value you have to inject store and use method **select()**, **selectSignal()** or **selectSnapshot()** method and pass callback method to it.  
  Example:
  ```ts
    number$: Observable<number>;
    constructor(
      private store: Store,
    ) { }

    ngOnInit() {
      this.number$ = this.store.select((state) => state?.test.value as number);
    }
  ```
  #### Selecting value using selector decorator
  To select value add field decorator **@Selector()** or **@SignalSelector()** and pass callback method to it.  
  Example:
  ```ts
  @SignalSelector((state) => state?.test.value)
  numberSignalSelector$: Signal<number>;
  ```
  ### Adding middleware
  #### Creating middleware

  ```ts
  export const MiddlewareChangingPayload: Middleware<unknown> = (context: MiddlewareContext<unknown>) => (next: Dispatch) => (action: ActionInterface<unknown>) => {
    if (action.getType() === "AddNumber" && action.getPayload() === 2) {
      next(new AddNumber(3));
    } else {
      next(action);
    }
  };

  export const MiddlewarePrintingStoreStateBeforeAndAfterHandlingAction: Middleware<unknown> = (context: MiddlewareContext<unknown>) => (next: Dispatch) => (action: ActionInterface<unknown>) => {
    console.log('Middleware 0 previous:', context.getState());
    next(action);
    console.log('Middleware 0 next:', context.getState());
  }
  ```
  #### Adding middleware to config main.ts
  ```ts
    import { NGSSStoreModule } from 'ngss'

    bootstrapApplication(AppComponent, {
        providers: [
            importProvidersFrom(BrowserModule, RouterModule.forRoot(appRouting), 
              NGSSStoreModule.forRoot([TestReducer, ShopReducer], {
                  middlewares: [MiddlewareChangingPayload,MiddlewarePrintingStoreStateBeforeAndAfterHandlingAction],
                  useSignalStore: true, 
                }),
              ),
          ]
    })
  ```
