// Home.js
import React from 'react';
import currencies from './utils/currencies';
import { checkStatus, json } from './utils/fetchUtils';//to get the fetch data
import CurrencyTable from './CurrencyTable';


class Home extends React.Component {
  constructor () {
    super();
    this.state = {  //initial state
      base: 'USD',
      rates: null,
      loading: true,
    }
  } 

  //call the getRatesData function when component mounts
  componentDidMount() {
    this.getRatesData(this.state.base); //get the rates data taking the base currency
  }

  changeBase = (event) => {
    this.setState({ base: event.target.value }); //changes the values relative to the new base
    this.getRatesData(event.target.value); //to fetch new data when base currency is changed
  }

  //function to fetch and store the data
  getRatesData = (base) => {
    fetch(`https://api.frankfurter.app/latest?from=${base}`)
      .then(checkStatus) //see if response is ok
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        console.log(data); //check for data object (replace this with code below)

        //restructure data to an array of objects in order to map and use it
        const rates = Object.keys(data.rates) //define new rates variable as the keys of the Object (ie. the acronyms)
        .filter(acronym => acronym !== base) //and filter out current base currency acronym from table, return an array
        .map(acronym => ({ //then map 
          acronym,
          rate: data.rates[acronym],
          name: currencies[acronym].name,
          symbol: currencies[acronym].symbol,
        }))
        this.setState({ rates: data.rates });
      })
      .catch(error => console.error(error.message));
  }

  render () {
    const { base, rates } = this.state;

    return (
      <React.Fragment>
        <form className="p-3 bg-light form-inline justify-content-center">
          <h3 className="mb-2">Base currency: <b className="mr-2">1</b></h3>

          <select value={base} onChange={this.changeBase} className="form-control form-control-lg mb-2">
          {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
          </select>

        </form>

        <CurrencyTable base={base} rates={rates} />

      </React.Fragment>
    )
  }
}

export default Home;