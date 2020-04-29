  import '../styles/index.scss';
  import { cuisine } from './models/cuisine.js';
  import { RestaurantRespository } from '../scripts/Respository/RestaurantRespository.js'; 
  import { Restaurant } from './models/Restaurant';
  import 'bootstrap';
  import '../styles/app.scss';

// let location = document.getElementById('RestaurantsLocation').value; 
// console.log('jjjjj', location);

  let restaurantsEx = new RestaurantRespository();

let table = document.querySelector('#table-head');
  
let submitInput = document.querySelector('#submittedform');

let form = document.querySelector('form');

let restuarants = [];
  
restuarants = restaurantsEx.RestaurantRespository;

let headKey = Object.keys(restuarants[0]);
  
document.addEventListener('DOMContentLoaded', () => {
  TableHeaderGenerators();
   generateTbody();
});


 
function selectedEditBtn() {
  let buttons = document.querySelectorAll('.editRow');
  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      let getInfo = button.getAttribute('info-id');
      console.log('getInfo', getInfo);
      let getMyRes = restuarants.find((y) => y.id == getInfo);
     let name = document.getElementById('name2').value = getMyRes.name;
     let location = document.getElementById('RestaurantsLocation').value = getMyRes.location;
      console.log('get y', location);
     let cuisineType =  document.getElementById('cuisineType').value = getMyRes.cuisineType;
    
     let y = document.getElementById('hidden').value = getMyRes.id;
      console.log('........', y);

      console.log('New Objected info', {
        id: y,
        name: name,
        location: location,
        cuisineType: cuisineType,
      });


    });
  });
}
 
function selectedBtn() {
  let buttons = document.querySelectorAll('.deleteRow');
 buttons.forEach((button) => {
   button.addEventListener('click', function (e) {
     e.preventDefault();
     if (window.confirm('Are you sure you want delete')) {
        deleteConfirmedBtn(button);
     }  

   });
 }); 
   
}
  function deleteConfirmedBtn(button) {
    let setAt = button.classList.contains('deleteRow');
    if (setAt === true) {
      let mild = button.getAttribute('info-id');
      console.log(mild);
      var resNew = restuarants.find((x) => x.id == mild);
      let index = button.parentNode.parentNode.rowIndex;

      table.deleteRow(index);
      restuarants.splice(resNew.id - 1, 1);
    }
  }

  
submitInput.addEventListener('submit', (e) => {
  e.preventDefault();
  let id = document.getElementById('hidden').value;
  let name = document.getElementById('name2').value;
 
  let location = document.getElementById('RestaurantsLocation').value;
   console.log('location',location);
  let cuisineType = document.getElementById('cuisineType').value;
  console.log('cuisineType', cuisineType);
  if (parseInt(id)) {
    const newId = parseInt(id);
    const findId = restuarants.find((x) => x.id == newId);
    findId.name = name;
    findId.location = location;
    findId.cuisineType = cuisineType;
 
    restuarants.splice(newId - 1, 1, findId);
  
     form.reset();
     while (table.hasChildNodes()) {
       table.removeChild(table.firstChild);
     }
    
    
  }
  
  if(id === "") {
    
  var formData = new FormData(form);
  // console.log((formData.get('name') + ' ' + formData.get('RestaurantsLocation') +
  //   ' ' + formData.get('cuisineType')));

  let newResturant = {
    id: formData.get('hidden'),
    id: formData.get('id'),
    name: formData.get('name'),
    location: formData.get('RestaurantsLocation'),
    cuisineType: formData.get('cuisineType'),
  };

  // let openNew = restuarants;
  let openNewLength = restuarants.length;
  let tempId = 0;
  for (let i = 0; i < openNewLength; i++) {
    if (restuarants[i].id > tempId) {
      tempId = restuarants[i].id;
    } // end of if statement
  } // end of loop

  let res = new Restaurant(
    tempId + 1,
    newResturant.name,
    newResturant.location,
    newResturant.cuisineType
  );
  restuarants.push(res);
  // restaurantsEx.setRestaurants = res;

  let newTableRow = table.insertRow();
  let createdValue = Object.values(res);
  console.log('values', createdValue);
  let newCreatedValueLength = createdValue.length;
  for (let i = 0; i < newCreatedValueLength; i++) {
    let newCell = newTableRow.insertCell();
    let text = document.createTextNode(createdValue[i]);
    newCell.appendChild(text);

    if (i === 3) {
      editButton(res, newTableRow);
      deleteButton(res, newTableRow);

      form.reset();
      while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
      }
    }

  
  }
  } // end of loop
  TableHeaderGenerators();
  generateTbody();
  
  if (parseInt(id)) {
    window.alert('Restaurant Updated!');
  }
  if (id === '') {
    window.alert('Restaurant created!');
  }
    
});
  
  
  
    




// Generate table boddy
  function generateTbody() {
     for (const element of restuarants) {
      let row = table.insertRow();
       for (let key in element) {
         if (key == 'id') {
           continue;
         } else {
           let cell = row.insertCell();
           let textnode = document.createTextNode(element[key]);
           cell.appendChild(textnode);

           if (key == 'cuisineType') {
             editButton(element, row);

             deleteButton(element, row);
           }
         }
          }
      
 }
    selectedBtn();
    selectedEditBtn();
} 

// generate table head
 function TableHeaderGenerators() {
   let thread = table.createTHead();
   let tr = thread.insertRow();
    
   for (const header of headKey) {
     if (header == 'id') {
       continue;
     } else {
            let th = document.createElement('th');
     
     let textnode = document.createTextNode(header);
     console.log('text', textnode);
     th.appendChild(textnode);
     tr.appendChild(th);
     }

   } // end of loop
    

   let span = document.createElement('EDIT');
   span.style.fontSize = '18px';
   span.style.fontWeight = '900';
   span.style.fontFamily = 'bold';

   let cellEdit = tr.insertCell();
   let textEdit = document.createTextNode('edit');
   cellEdit.appendChild(textEdit);
   span.appendChild(textEdit);
   cellEdit.appendChild(span);

   let span1 = document.createElement('DELETE');
   span1.style.fontSize = '18px';
   span1.style.fontWeight = '900';
   span1.style.fontFamily = 'bold';
   let cellDelete = tr.insertCell();
   let textDelete = document.createTextNode('delete');
   cellDelete.appendChild(textDelete);
   span1.appendChild(textDelete);
   cellDelete.appendChild(span1);
 }

  function createNewButton(textcontent, classname, classcustom, elementid) {
    let button = document.createElement('BUTTON');
    button.textContent = textcontent;
    button.className = `btn btn-${classname} btn-sm ${classcustom}`;
    button.setAttribute('info-id', elementid);
    return button;
}
  
   // create edit button and insert row to the table
  function editButton(element, row) {
    let cellE = row.insertCell();
    let button = createNewButton('EDIT', 'primary', 'editRow', element.id);

    cellE.appendChild(button);
  } // end of function

  // create a delete button and insert a row to the table
  function deleteButton(element, row) {
    let cellD = row.insertCell();
    let button = createNewButton('DELETE', 'info', 'deleteRow', element.id);

    cellD.appendChild(button);
  } // end of function