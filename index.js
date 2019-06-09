'use strict';

/**
 * user story #2 
 * User can type in a search term and the displayed list 
 * will be filtered by item names only containing that search term
 */


/**
 * user story #3 
 * User can edit the title of an item
 */

//Store that has all properties of each item and will update with the changes of in the store 
const STORE = {
  items: [
    {id: cuid(), name: 'apples', checked: false},
    {id: cuid(), name: 'oranges', checked: false},
    {id: cuid(), name: 'milk', checked: true},
    {id: cuid(), name: 'bread', checked: false}
  ],
  //new property that communicates if the item is checked or not
  //is a checkbox, if checked the hide, item defualt is not checked
  hideCompleted: false
};

//html shell for list items
function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">

        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>

        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>

        <button class="shopping-item-update-name js-item-rename">
          <span class="button-label">rename</span>
        </button>
      </div>
    </li>`;
}

//adds item to list
function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join('');
}

//updates the shopping list
function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');

  // set up a copy of the store's items in a local variable that we will reassign to a new
  // version if any filtering of the list occurs
  let filteredItems = STORE.items;
  // if the `hideCompleted` property is true, then we want to reassign filteredItems to a version
  // where ONLY items with a "checked" property of false are included
  //if hide completed button is true(checked) then filteredItems(items in the store) are filtered so that 
  //only the not checked items will be displayed
  if (STORE.hideCompleted) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }

  // at this point, all filtering work has been done (or not done, if that's the current settings), so
  // we send our `filteredItems` into our HTML generation function 
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

//item name is the user input and pushes it into the STORE as an object with 
//the name and checked property set to false
function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

//when user submits in form
function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    //setting variable to the val of user input item 
    const newItemName = $('.js-shopping-list-entry').val();
    //resetting form to blank
    $('.js-shopping-list-entry').val('');
    //running the new item through function to add to the store
    addItemToShoppingList(newItemName);
    //updating the dom
    renderShoppingList();
  });
}

//the action of clicking the checkbox
function toggleCheckedForListItem(itemId) {
  console.log('Toggling checked property for item with id ' + itemId);
  const item = STORE.items.find(item => item.id === itemId);
  item.checked = !item.checked;
}

//puts slash property onto item that is passed through
function getItemIdFromElement(item) {
  console.log('ran getItemIdFromElement');
  return $(item)
    .closest('li')
    .data('item-id');
}

//when the user clicks additem, grabs value and runs through getItemIdFromElement
//and updates the DOM
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}


// name says it all. responsible for deleting a list item.
function deleteListItem(itemId) {
  console.log(`Deleting item with id  ${itemId} from shopping list`)

  // as with `addItemToShoppingLIst`, this function also has the side effect of
  // mutating the global STORE value.
  //
  // First we find the index of the item with the specified id using the native
  // Array.prototype.findIndex() method. Then we call `.splice` at the index of 
  // the list item we want to remove, with a removeCount of 1.
  const itemIndex = STORE.items.findIndex(item => item.id === itemId);
  STORE.items.splice(itemIndex, 1);
}

//pulls functions to make action happen when user clicks delete button
function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the index of the item in STORE
    const itemIndex = getItemIdFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemIndex);
    // render the updated shopping list
    renderShoppingList();
  });
}

// Toggles the STORE.hideCompleted property
//turn on or off hide completed
function toggleHideFilter() {
  STORE.hideCompleted = !STORE.hideCompleted;
}

// Places an event listener on the checkbox for hiding completed items
//what happens when you toogle
function handleToggleHideFilter() {
  $('.js-hide-completed-toggle').on('click', () => {
    toggleHideFilter();
    renderShoppingList();
  });
}

//what the rename button does
function renameItem(itemRename){
  let renameItem = prompt('Rename your item');
  
  

  $(itemRename.name).replaceWith(renameItem);
}

//elistener for user clicking rename button
function handleRenameItem(){
  $('.js-shopping-list').on('click', '.js-item-rename', event => {
    renameItem();
    renderShoppingList();
  }); 
}


// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideFilter();
  handleRenameItem();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
