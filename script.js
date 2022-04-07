
/////

console.log("hello restaurant");
var tables= [{
    tableNo: 1,
    amount: 0.00,
    itemList: []
},
{
    tableNo: 2,
    amount: 0.00,
    itemList:  []
},
{
    tableNo: 3,
    amount: 0.00,
    itemList:  []
},
{
    tableNo: 4,
    amount: 0.00,
    itemList:  []
},
{
    tableNo: 5,
    amount: 0.00,
    itemList:  []
},
]
var items = [
    {
        foodName: "Veg Burger",
        cost: 99.00,
        type: "Starter"
    },

    {
        foodName: "Paneer Tikka Masala",
        cost: 149.00,
        type: "Starter"
    },
    {
        foodName: "Manchurian",
        cost: 149.00,
        type: "Chinese"
    },
    {
        foodName: "Pasta",
        cost: 149.00,
        type: "chinese"
    },
    {
        foodName: "Hakka Noodles",
        cost: 149.00,
        type: "Starter"
    },
    {
        foodName: "Shahi Paneer",
        cost: 269.00,
        type: "Main Course"
    },
    {
        foodName: "Paneer Butter Masala",
        cost: 299.00,
        type: "Main Course"
    },
    {
        foodName: "Shahi Paneer",
        cost: 269.00,
        type: "Main Course"
    },
    {
        foodName: "Coke",
        cost: 40.00,
        type: "Beverages"
    },
    {
        foodName: "Pepsi",
        cost: 70.00,
        type: "Beverages"
    }
];

function createTables(){ 
    ///for table loading in Html------------

    for(let i=0;i<tables.length;i++){
        let newTableElement = document.createElement('div');
        newTableElement.className = "newTableElement";
        newTableElement.id=`table-${i+1}`;   
        // drag function
        // newTableElement.ondragover='allowDrop(event)';
        // newTableElement.ondrop='drop(event)';
        //
        newTableElement.addEventListener('dragover',function() {allowDrop(event)})
        newTableElement.addEventListener('drop',function() {drop(event)})
        newTableElement.addEventListener('click',function(){billDisplay(this)})
        //console.log(newTableElement.id);
        let tableHead = document.createElement('h2');
        tableHead.className = "tableNo";
        tableHead.innerHTML = `Table-${tables[i].tableNo}`;
        newTableElement.appendChild(tableHead);
        let pr = document.createElement('p');
        let cost = document.createElement('span');
        cost.className = "bill";
        cost.innerHTML = `Rs. ${tables[i].amount} | `;
        cost.id=`table${i+1}amount`;
        let items = document.createElement('span');
        items.className = "totalItems";
        items.id=`table${i+1}items`;
        items.innerHTML = `items: ${tables[i].itemList.length}`;
        pr.appendChild(cost);
        pr.appendChild(items);
        newTableElement.appendChild(pr);

        document.getElementById("newTable").appendChild(newTableElement);
    }
}

function createItems() {
  

///for item loading in html ------

    for( i=0;i<items.length;i++){
        let newItemElement = document.createElement('div');
         newItemElement.id=`item-${i}`
         console.log(newItemElement.id)
         
       //  newItemElement.ondragstart='drag(event)';
        newItemElement.addEventListener('dragstart',function() {drag(event)})
        newItemElement.draggable="true"
        let food = document.createElement('h2');
        food.style.fontSize='24px'
        food.className = "itemName";
        food.innerHTML = items[i].foodName;
        newItemElement.appendChild(food);
        let cost = document.createElement('h3');
        cost.className = "cost";
        cost.innerHTML = items[i].cost;
        newItemElement.appendChild(cost);
        type = document.createElement('span');
        type.className = "type";
        type.innerHTML = items[i].type;
        newItemElement.appendChild(type);
        newItemElement.className = `${items[i].foodName} ${items[i].type}`;
        newItemElement.classList.add("newItemElement");


        document.getElementById("newItem").appendChild(newItemElement);
    }
}

// var tabsearch =document.getElementById("tablesearch").value;
//     console.log(tabsearch);

// for searching TABLE -----

function searchtable(){
    let tabsearch =document.getElementById("tablesearch").value;
    //console.log(tabsearch);
    let getTable = document.getElementsByClassName("newTableElement");
    //console.log(getTable);
    if(tabsearch!=" "){
        for(let i=0;i<getTable.length;i++){
            
            if(getTable[i].id.indexOf(tabsearch)!=-1){
                console.log(getTable[i].style.display );
                getTable[i].style.display = 'block';
            }else{
                getTable[i].style.display = 'none';
            }
        }

    }

}
// for searching ITEM ----

function itemsearch(){
    let itemsearch = document.getElementById("itemSearch").value;
   // console.log(itemsearch);
    let foods = document.getElementsByClassName("newItemElement");
   // console.log(foods);

     for(let k=0;k<foods.length;k++){
         if(foods[k].className.toLowerCase().indexOf(itemsearch.toLowerCase())!=-1){
             foods[k].style.display='block';
         }else{
             foods[k].style.display = 'none';
         }
     }
}

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
    //console.log(ev.target.className)
}
function allowDrop(ev) {
    ev.preventDefault();
  }

function drop(ev)
 {
     ev.preventDefault();
     var data = ev.dataTransfer.getData("text");
     let arr = data.split("-");
     let item_name = arr[0];
     let item_id = arr[1];   
    //  console.log(item_name);
    //  console.log(item_id);
 
     let tableid = ev.target.id;
     console.log(tableid)
     console.log(item_name,item_id,tableid);
    updateItemList(tableid[6],items[item_id].foodName,items[item_id].cost)
    updateTable(tableid[6]);
    console.log("aayush");
 
   }  

// function for updating list-------
function updateItemList(t_id,name,cost){

      let exists = false;
      for(let i=0;i<tables[t_id-1].itemList.length;i++){
          if(tables[t_id-1].itemList[i].name == name){
              exists=true;
          }
      }
      if(exists==true){

          for(let i=0;i<tables[t_id-1].itemList.length;i++){
              if(tables[t_id-1].itemList[i].name == name){
                  tables[t_id-1].itemList[i].count++;
                  break;
              }
          }

      }else{
          var tempObj = {
              name : name,
              cost : cost,
              count : 1,
          }
          tables[t_id-1].itemList.push(tempObj);

      }

}

function updateTable(t_id)
{
    
    let amt =0;
    let cnt =0;
    for(let i=0;i<tables[t_id-1].itemList.length;i++){
       amt += (tables[t_id-1].itemList[i].cost*tables[t_id-1].itemList[i].count);
       cnt+=(tables[t_id-1].itemList[i].count);
    }
         document.getElementById(`table${t_id}amount`).innerHTML=`Rs. ${amt} | `;
         document.getElementById(`table${t_id}items`).innerHTML= `items: ${cnt}`;
      
    
}

var visible=false;
var currentId
function billDisplay(ele){
      //console.log(visible);
     if(visible == true)
     {
        document.getElementById('modal').style.display="none";
        visible = false;
     }else{
        visible= true;
        document.getElementById('modal').style.display="block";
        document.getElementById("modalHeading").innerHTML = ele.id + " Bill";
         let tempid=ele.id;
         currentId=tempid[6];
        updateBill(tempid[6]); //table-1 6th index

        
     }

 }
function updateBill(t_id)
{
        console.log(t_id);
        document.getElementById('tab-bill').innerHTML=` <tr >
        <th>S no</th>
        <th>item</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>delete</th>
    </tr>`
        let mycount=0;
        for(let i=0;i<tables[t_id-1].itemList.length;i++){
            
          if(tables[t_id-1].itemList[i].count!=0){
          document.getElementById('tab-bill').innerHTML+=`
          <tr>
            <td> ${++mycount} </td>
            <td>${tables[t_id-1].itemList[i].name}</td>
            <td>${tables[t_id-1].itemList[i].cost}</td>
            <td><input type='number' min='1' max='5' value = '${tables[t_id-1].itemList[i].count}' onchange='updateValue(${t_id},${i},this)' ></td>
            <td><button style="float: right;" onclick="deleteItem(${t_id},${i})" > X </button></td>
          </tr>
          `
          }
          
        }
        let total =0;
        for(let i=0;i<tables[t_id-1].itemList.length;i++){
            total += (tables[t_id-1].itemList[i].count * tables[t_id-1].itemList[i].cost);
        }
        document.getElementById('displaytotal').innerHTML = total;
       updateTable(t_id)

}

function generateBill(){
    alert("Bill generated : ) \n Thanks for visit!!");
    clearTable();
}

function clearTable(){
    console.log(currentId +"clearTable called");
    
        tables[currentId-1].itemList=[];
        document.getElementById(`table${currentId}amount`).innerHTML=`Rs. 0 | `;
        document.getElementById(`table${currentId}items`).innerHTML=`items: 0`;
        updateBill(currentId);
    

 }
 // function will be called when someone increases item in billing page....

 function updateValue(t_id,index,ev){
        // console.log("updatevalue called")
     
       // console.log(t_id,index,ev.value);//debug
        tables[t_id-1].itemList[index].count = parseInt(ev.value);
        updateBill(t_id);


}

// function to delete selective item while billing

function deleteItem(t_id,index ){
    console.log(index);
    console.log("deleteItem called")// debug 

       tables[t_id-1].itemList[index] = {
           name : "name",
           cost : 0,
           count : 0,
        };
        updateBill(t_id);
   
   
   }

