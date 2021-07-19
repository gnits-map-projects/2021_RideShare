
import React, { Component } from 'react';
import Autocomplete from  'react-autocomplete';
import { getCountry, matchCountry } from './dataService';
import './App.css';
 
class autoComplete extends Component {
  state = { value: '' };
 
  render() {
    return (
      <div className = "card col-sm-6" style = {{ marginTop: 40, marginLeft: 50 }}>
      <div class="card-header">
        Country Name :
      </div>
      <div class="card-body">
      <form>
        <div className="form-group">
 
            <Autocomplete
              value={ this.state.value }
              inputProps={{ id: 'states-autocomplete' }}
              wrapperStyle={{ position: 'relative', display: 'inline-block' }}
              items={ getCountry() }
              getItemValue={ item => item.name }
              shouldItemRender={ matchCountry }
              onChange={(event, value) => this.setState({ value }) }
              onSelect={ value => this.setState({ value }) }
              renderMenu={ children => (
                <div className = "menu">
                  { children }
                </div>
              )}
              renderItem={ (item, isHighlighted) => (
                <div
                  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                  key={ item.abbr } >
                  { item.name }
                </div>
              )}
            />
            </div>
          </form>
          </div>
      </div>
    );
  }
}
 
export default autoComplete;