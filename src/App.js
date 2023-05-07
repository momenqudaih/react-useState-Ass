import Counter from './components/Counter';
import Colorizer from './components/Colorizer';
import Todos from './components/Todos';

import Form from './components/Form';

function App() {
    return (
        <div className="App">
            <Counter />
            <hr />
            <Colorizer />
            <hr />
            <Todos />
            <hr />
            <Form />
        </div>
    );
}

export default App;
