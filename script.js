function addItem(){
    let item=document.getElementById("itemInput").value;
    let quantity=document.getElementById("quantityInput").value;

    let list=JSON.parse(localStorage.getItem("list"))||[];

    list.push({
        item:item,
        quantity:quantity
    });

    localStorage.setItem("list", JSON.stringify(list));

    document.getElementById("itemInput").value="";
    document.getElementById("quantityInput").value="";

    displayItems();
}
function displayItems(){

    let list=JSON.parse(localStorage.getItem("list"))||[];

    let groceryList=document.getElementById("groceryList");
    groceryList.innerHTML="";

    if(list.length===0){
        groceryList.innerHTML="<li>No items in the list</li>";
        return;
    }

    list.forEach((data,index)=>{
        groceryList.innerHTML += `<li>${index+1}. ${data.item} - ${data.quantity} <button onclick="deleteItem(${index})">Delete</button></li>`;
    });

}
function deleteItem(index){

    let list=JSON.parse(localStorage.getItem("list"))||[];

    list.splice(index,1);
    localStorage.setItem("list",JSON.stringify(list));

    displayItems();
}
function clearList(){
    localStorage.removeItem("list");
    displayItems();
}
function getList(){
    const {jsPDF}=window.jspdf;
    const doc=new jsPDF();

    let list=JSON.parse(localStorage.getItem("list"))||[];      

    if(list.length===0){    
        alert("No items in the list to generate PDF");
        return;
    }

    doc.text("Grocery List",20,20);

    list.forEach((item,i)=>{
        doc.text(`${i+1}. ${item.item} - ${item.quantity}`,20,30+(i*10));
    });

    doc.save("GroceryList.pdf");
}
window.onload=displayItems;