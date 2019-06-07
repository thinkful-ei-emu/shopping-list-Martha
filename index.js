'use strict';

class items{
  constructor(Name,Checked= false){
    this.name=Name;
    this.checked = Checked;
  }
}

const STORE = [
  new items('apples'),
  new items('oranges'),
  new items('milk', true),
  new items('bread') 
];

function renderPage(){
//create and display html
  let htmlCode = STORE.map(function(element){
    if(element.checked){
      return `<li>
      <span class="shopping-item shopping-item__checked">${element.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
  </li>`;
    } else {
      return `<li>
        <span class="shopping-item">${element.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
    </li>`;
    }
  });

  $('.js-shopping-list').html(htmlCode);
}
/**
*
*/
function addItem(){
//on user input, adds items to the store
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    let userInput =$(event.target).parent().find('.js-shopping-list-entry').val();
    STORE.push(new items(userInput));
    console.log(STORE);
  });
}

function deleteItem(){
//on user input,removes items to the store
  $('.shopping-list').on('click', '.shopping-item-delete', event => {
    event.preventDefault();
    $(event.currentTarget).closest('li').remove();
  });
}

function checkItem(){
//on user input, toggle the state of the item
  $('.shopping-list').on('click', '.shopping-item-toggle', event => {
    event.preventDefault();
    $(event.currentTarget).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
  });
}

function main(){
  addItem();
  renderPage();
  deleteItem();
  checkItem();
}

$(main);