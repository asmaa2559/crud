let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

let mood = 'creat';
let tmp;

// get total
function getTotal(){
    if (price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= result ;
        total.style.backgroundColor = "#040"
    }
    else{
        total.innerHTML= '';
        total.style.backgroundColor = "rgb(184, 28, 17)";
    }
}

// creat data
let dataProduct;
if(localStorage.product !=null){
    dataProduct = JSON.parse(localStorage.product)
}else
{
    dataProduct=[];
}
submit.onclick = function (){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
       
    if(title.value !=''&&price.value!=''&&category.value !=''&&newPro.count<100){

        if(mood === 'creat'){
        if(newPro.count>1){
        for(let i=0 ; i< newPro.count ; i++){
            dataProduct.push(newPro);
        }
       
    }
    else{
        dataProduct.push(newPro);

    } 
    }else {
        dataProduct[ tmp ] = newPro;
        mood='creat';
        submit.innerHTML='create';
        count.style.display='block';
    }
   
    
         


   
    // save localstorage
    localStorage.setItem('product',JSON.stringify(dataProduct));

    clearData();
    showData();
    
}};
clearData();


// clear inputs

function clearData(){
   title.value='';
   price.value='';
   taxes.value='';
   ads.value='';
   discount.value='';
   total.innerHTML='';
    count.value='';
    category.value='';


}


// table
function showData(){
    getTotal();
    let table='';
    for(let i=0;i< dataProduct.length;i++){
        table +=`
        <tr>
           <td>${i+1}</td>
           <td>${dataProduct[i].title}</td>
           <td>${dataProduct[i].price}</td>
           <td>${dataProduct[i].taxes}</td>
           <td>${dataProduct[i].ads}</td>
           <td>${dataProduct[i].discount}</td>
           <td>${dataProduct[i].total}</td>
           <td>${dataProduct[i].category}</td>
           <td><button onclick="updateData(${i})" class='w-50 fs-5' id='update'>update</button></td>
           <td><button onclick="deleteData(${i})" class='w-50 fs-5' id='delete'>delete</button></td
        
        </tr> `
    }



    document.getElementById('tbody').innerHTML=table;
    let btndelete = document.getElementById('deleteAll');
    if(dataProduct.length > 0){
        btndelete.innerHTML=`
        <button onclick="deleteAll()" class='mx-1'>Delete All ( ${dataProduct.length} )</button>
        `
    }else
    {
        btndelete.innerHTML='';
    }

}
showData();


// delete

function deleteData(i){
  dataProduct.splice(i,1);
  localStorage.product = JSON.stringify(dataProduct);
   showData();
}

function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}


// update
function updateData(i){
  title.value=dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataProduct[i].category;
  submit.innerHTML = 'update'
  tmp = i;

  mood = 'update';
  scroll({
    top:0,
    behavior:'smooth'
  });
}


// search
let searchMood='title';
function getSearchMood(id){
    let search =document.getElementById('search')
  if(id=='searchtitle'){
    searchMood='title';
    search.placeholder = 'Search By Title'
  }else{
    searchMood='category';
    search.placeholder = 'Search By Category'

  }
  search.focus();
  search.value='';
  showData();

}

function searchData(value){
    let table='';
    if(searchMood=='title'){
          
        for(let i=0;i<dataProduct.length ; i++){

            if(dataProduct[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                   <td>${i+1}</td>
                   <td>${dataProduct[i].title}</td>
                   <td>${dataProduct[i].price}</td>
                   <td>${dataProduct[i].taxes}</td>
                   <td>${dataProduct[i].ads}</td>
                   <td>${dataProduct[i].discount}</td>
                   <td>${dataProduct[i].total}</td>
                   <td>${dataProduct[i].category}</td>
                   <td><button onclick="updateData(${i})" class='w-50 fs-5' id='update'>update</button></td>
                   <td><button onclick="deleteData(${i})" class='w-50 fs-5' id='delete'>delete</button></td
                
                </tr> `
            }
        }

    }else{

        for(let i=0;i<dataProduct.length ; i++){

            if(dataProduct[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                   <td>${i+1}</td>
                   <td>${dataProduct[i].title}</td>
                   <td>${dataProduct[i].price}</td>
                   <td>${dataProduct[i].taxes}</td>
                   <td>${dataProduct[i].ads}</td>
                   <td>${dataProduct[i].discount}</td>
                   <td>${dataProduct[i].total}</td>
                   <td>${dataProduct[i].category}</td>
                   <td><button onclick="updateData(${i})" class='w-50 fs-5' id='update'>update</button></td>
                   <td><button onclick="deleteData(${i})" class='w-50 fs-5' id='delete'>delete</button></td
                
                </tr> `
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;


}