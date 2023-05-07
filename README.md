## REACT State and HOOKS
Now that you have been introduced to the concept of React, how to render data, and how to pass data from one component to another using props, but what if we wanted to change our component UI based on its internal logic or change it based on some data or some actions that happen inside the component like clicking a button? here comes the role of the component state and comes to the use of React Hooks, so what is a state in React and what are Hooks?

### What is State?
State is similar to props, but it is private and fully controlled by the component

State is a representation of parts of the app, which allow the component to keep track of the values that can change, in other words, it's a way for making a dynamic component that can be changed based on some actions. Any change of the state will trigger the render of the component and change the UI.

### What are Hooks?
Hooks are functions that provide a way to create and control the component state and a way to perform side effects.


### The useState Hook
This probably the most built-in hooks you are going to use. This hook provides a way for us to define a state that will preserve the data during each render and a way to trigger the re-render of a component. It takes an initial value and returns an array with two values:

* the state value.
* a function to update the value of the state.

#### How to use useState?
```jsx
const [value, setValue] = React.useState(initialValue);
```
or
```jsx
const state = React.useState(initialValue);
const value = state[0];
const setValue = state[1];
```

#### Example:

```jsx
function Counter () {
  const [count, setCount] = React.useState(0);

  const incrementCounter = () => {
    setCount(count + 1);
  };
    
  return (
    <div>
      <p>The Counter state is: {count}</p>
      <button onClick={incrementCounter}>Add 1</button>
    </div>
  );
}
```

The **Initial Value** can be any type of value even a function 

Note: never mutate a state variable. For example setCount(count++) will break React's update in subtle and confusing ways. You should always pass a totally new variable to the updater function, and leave the old state variable unchanged.

The **update function** will replace the current value so be careful when using any type of object as your initial value as calling the update function will remove the current value and replace it with the new one. Let's take an example:

```jsx
function Counter() {
  const [data, setData] = React.useState({
    count: 0,
    userName: "User",
  });

  const incrementCounter = () => {
    //this will replace the whole object
    // and will delete the property userName
    setData({
      count: data.count + 1,
    });
  };

  return (
    <div>
      <p>
        {data.userName} 👤 increased the counter to: {data.count}
      </p>
      <button onClick={incrementCounter}>add 1</button>
    </div>
  );
}
```

Now if you clicked the button the userName will be removed so to solve this you can split the state in this way

```jsx
const [count, setCount] = React.useState(0);
const [userName, setUserName] = React.useState("User");
```

or if you want to keep it as an Object then you have to copy the the old data by using ```Object.assign(target, source)``` or the ```...spread operator``` or wahtever way you prefer

```jsx
setData({
  ...data,
  count: data.count + 1,
});
```

Also with updater function you will have access to the old value let's assume that there are two places that update the state based on its previous value, les's see this with our example

```jsx
const incrementCounterTwice = () => {
  setCount(count + 1);
  /*
  ...some operation that will need us
  to call setCount after it
  */
  setCount(count + 1);
};
```

when you click on the function the counter will only increase by one because React for performance reason will dispatch multiple updates together and the order won't be guaranteed so if you rely on the old state you can write it in this way by passing a function that will contain the previous value

```jsx
const incrementCounterTwice = () => {
  //this way we will be sure to update
  //based on the latest value
  setCount(oldCountVal => oldCountVal + 1);
  /*
  ...some operation that will need us
  to call setCount after it
  */
  setCount(oldCountVal => oldCountVal + 1);
};
```
#### lazy state initialization

Why would I use a function as the initial value? Let's imagine that our initial value depends on calling another function which will do some heavy calculation like the following:

```jsx
function doHeavyCalc () {
  //some heavy calculation
}

function App() {
  const [result, setResult] = React.useState(doHeavyCalc());
  //... some other code
}
```
Now because of the way the functions work the doHeavyCalc will get invoked on each render, this will have some bad performance effects on our component, React provide a way to avoid this with (lazy state initialization) by passing a function as an initial value which will be called only once during the initial render of the Component.

```jsx
// notice the function that will return the result
// of the doHeavyCalc function
const [result, setResult] = React.useState( ()=> doHeavyCalc());
```
or if you are dealing with one of the browser API such as the localstorage where you are getting the initial value from the local storage so this will call the storage everytime the component run.

Using this way React will know that we want to run this function only once.

------------------------------------------------------
Now practice time

***Excercise 1***

Create a counter with:

1. Increment button
1. Decrement button
1. Reset button
------------------------------------------------------
***Excercise 2***

Create a palette color:

1. Create an array with a group of colors.
1. Loop through this array and create a button for each color.
1. Clicking the button will change the state color of the page
    * you can add the style directly to the div
```jsx
    <div style={{backgroundColor: color}}>
```
------------------------------------------------
***Excercise 3***

Create a todo app which includes:

1. add a todo.
1. delete a todo.
```jsx
//todo shape
{
  id: 1,
  description: "..."
}
```

--------------------------------------------
***Excercise 4***

Create a sign up form which contains:

1. email input.
1. password input.
1. confirm password input.
1. submit button
    * the user should be able to see an error if he submitted an empty input.
    * the user should be able to see an error when the two passwords are not matched.
    * if everything is good then the user should see his submitted data under the form with a delete button.
    * The user should be able to use the delete button to delete his data
Hint: check thess resources to learn how to get values from inputs and forms: https://reactjs.org/docs/handling-events.html https://reactjs.org/docs/events.html