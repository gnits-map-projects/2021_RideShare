
export function getCountry() {
    return [
  {name: '', lat: '',long:''},
  {name: 'AMB', lat: '',long:''},
  {name: 'Forum Sujana', lat: '',long:''},
  {name: 'Inorbit', lat: '',long:''},
  {name: 'GVK one', lat: '',long:''},
  {name: 'Manjeera', lat: '',long:''},
  {name: 'City Center', lat: '',long:''},
  {name: 'Panjagutta Next Galleria', lat: '',long:''},
  {name: 'Irrum Manzil Next Galleria', lat: '',long:''},
  {name: 'Hyderabad Central Panjagutta', lat: '',long:''},
  {name: 'Hyderabad Central Gachibowli', lat: '',long:''},
  {name: 'IMAX', lat: '',long:''},
  {name: 'Podium', lat: '',long:''},
  {name: 'Asian Mcube Atthapur', lat: '',long:''},
  {name: 'Mantra Mall', lat: '',long:''},
  {name: 'Madhapur Next Galleria', lat: '',long:''},
  {name: 'PVT Market', lat: '',long:''},
  {name: 'G Narayanamma Intitute of Technology and Science', lat: '',long:''},
  {name: 'VNR Vignan Jyothi', lat: '',long:''},
  {name: 'JNTUH', lat: '',long:''},
  {name: 'OU', lat: '',long:''},
  {name: 'CBIT', lat: '',long:''},
  {name: 'MGIT', lat: '',long:''},
  {name: 'Vasavi', lat: '',long:''},
  {name: 'CVR', lat: '',long:''},
  {name: 'CVSR', lat: '',long:''},
  {name: 'Sridevi', lat: '',long:''},
  {name: 'MVSR', lat: '',long:''},
  {name: 'CMR', lat: '',long:''},
  {name: 'MLRIT', lat: '',long:''},
  {name: 'Mallareddy', lat: '',long:''},
  {name: 'BVRIT', lat: '',long:''},
  {name: 'Bhoj Reddy', lat: '',long:''},
  {name: 'IITH', lat: '',long:''},
  {name: 'IIITH', lat: '',long:''},
  {name: 'MGBS', lat: '',long:''},
  {name: 'JBS', lat: '',long:''},
  {name: 'Secunderabad Railway Station', lat: '',long:''},
  {name: 'Nampally Railway Station', lat: '',long:''},
  {name: 'Begumpet Railway Station', lat: '',long:''},
  {name: 'Lakdikapul Railway Station', lat: '',long:''},
  {name: 'Kairathabad Railway Station', lat: '',long:''},
  {name: 'RGIA', lat: '',long:''},
    ]}
   
  export function matchCountry(state, value) {
      //console.log(state);
      //console.log(value);
    return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 //||
      //state..toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }