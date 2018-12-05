'use strict';
function Display(props) {
  return (
    <div className="display">
      <div id="formula">{props.formula}</div>
      <div id="display">{props.display}</div>
    </div>
  )
}

function KeyPads(props) {
  const keys = [
    { class: "keys wider", id: "clear", value: "C" },
    { class: "keys", id: "divide", value: "/" },
    { class: "keys", id: "multiply", value: "*" },
    { class: "keys numeric", id: "seven", value: "7" },
    { class: "keys numeric", id: "eight", value: "8" },
    { class: "keys numeric", id: "nine", value: "9" },
    { class: "keys", id: "subtract", value: "-" },
    { class: "keys numeric", id: "four", value: "4" },
    { class: "keys numeric", id: "five", value: "5" },
    { class: "keys numeric", id: "six", value: "6" },
    { class: "keys", id: "add", value: "+" },
    { class: "keys numeric", id: "one", value: "1" },
    { class: "keys numeric", id: "two", value: "2" },
    { class: "keys numeric", id: "three", value: "3" },
    { class: "keys long", id: "equals", value: "=" },
    { class: "keys numeric wider", id: "zero", value: "0" },
    { class: "keys numeric", id: "decimal", value: "." }
  ];
  const keyPads = keys.map(key => {
    return (
      <button type="button" className={key.class} key={key.id} id={key.id}
        onClick={props.handleClick}>
        {key.value}
      </button>
    )
  });
  return (
    <div>
      {keyPads}
    </div>
  )
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      display: '0',
      decimal: false,
      stack: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick(e) {
    const keyInput = e.target.innerHTML.toUpperCase();
    switch (keyInput) {
      case 'C':
        this.setState({
          formula: '',
          display: '0',
          decimal: false,
          stack: []
        });
        break;
      case '=':
        this.calculateResult();
        break;
      case '.':
        this.setState(state => {
          if (state.decimal) {
            return;
          }
          return {
            formula: state.formula + keyInput,
            display: parseInt(state.display).toString() + keyInput,
            decimal: !state.decimal
          };
        });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        this.processOperator(keyInput);
        break;
      default:
        this.processNumeric(keyInput);
        break;
    }
  }

  calculateResult() {
    const weightTable = {"+": 1, "-": 1, "*": 2, "/": 2};
    let valueStack=[];
    let operatorStack=[];
    const topOf = stack => stack[stack.length-1];
    const isEmpty = stack => stack.length==0;
    const weight = op => weightTable[op];
    const performArithmatic = function() {
      while (operatorStack.length > 0) {
          const val2 = valueStack.pop();
          const val1 = valueStack.pop();
          const operator = operatorStack.pop();
          switch (operator) {
              case "*":
                valueStack.push(val1 * val2);
                break;
              case "/":
                valueStack.push(val1 / val2);
                break;
              case "+":
                valueStack.push(val1 + val2);
                break;
              case "-":
                valueStack.push(val1 - val2);
              break;
          }
      }
    };

    // create a copy of the stack, add numeric input before '=' to it
    let stack = this.state.stack.slice();
    stack.push(parseFloat(this.state.display));
    // Refer to http://www2.lawrence.edu/fast/GREGGJ/CMSC150/071Calculator/Calculator.html for this part of the code
    for (let i=0; i<stack.length; i++) {
        const item = stack[i];
        if (this.isOperator(item)) {
            if (isEmpty(operatorStack) || weight(item) > weight(topOf(operatorStack))) {
                operatorStack.push(item);
            } else if (!isEmpty(operatorStack) && (weight(item) <= weight(topOf(operatorStack)))) {
                performArithmatic();
                operatorStack.push(item);
            } else {
                operatorStack.push(item);
            }
        } else {
            valueStack.push(item);
        }
    }
    performArithmatic();
    const answer = valueStack.pop();
    this.setState({
      formula: this.state.formula + "=" + answer.toString(),
      display: answer.toString(),
      decimal: false,
      stack: [answer]
    });
  }

  processOperator(input) {
    let s = this.state.stack.slice();
    if (this.isOperator(this.state.display)) {
      s.pop();
      s.push(input);    //drop the previous operator and replace with new one
      this.setState({
        formula: this.state.formula.substr(0,this.state.formula.length-1) + input,
        display: input,
        stack: s
      })
    } else {  // push both previous input data and operator to stack, clear decimal
      s.push(parseFloat(this.state.display));
      s.push(input);
      this.setState({
        formula: this.state.formula + input,
        display: input,
        decimal: false,
        stack: s
      });
    }
  }

  processNumeric(input) {
    this.setState(state => {
      let valueToShow = '';
      if (state.decimal) {    // decimal point is set
        valueToShow = state.display + input;
      } else {    // is integer
        // reset display if previous display is an operator
        const prevDisplay = (this.isOperator(state.display)) ? '0': state.display;
        valueToShow = (parseInt(prevDisplay) * 10 + parseInt(input)).toString();
      }
      return {
        formula: this.state.formula + input,
        display: valueToShow
      };
    });
  }

  isOperator(op) {
      return /[+\-*/]/.test(op);
  }

  handleKeyPress(e) {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="calculator">
        <Display formula={this.state.formula} display={this.state.display}/>
        <KeyPads handleClick={this.handleClick} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('app')
);
