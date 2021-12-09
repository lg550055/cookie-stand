'use strict';
let locations = [];

function Store(name, min, max, avg) {
  this.name = name;
  this.minCust = min;
  this.maxCust = max;
  this.avgPurch = avg;
  this.eachHour = [];
  locations.push(this);
}

let seattle = new Store('Seattle',23,65,6.3);
let tokyo = new Store('Tokyo',3,24,1.2);
let dubai = new Store('Dubai',11,38,3.7);
let paris = new Store('Paris',20,38,2.3);
let lima = new Store('Lima',2,16,4.6);

function randomCount(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}

function headings(total=true) {
  document.write("<tr>");
  document.write("<th></th>");
  for (let i=6; i<20; i++) {
    if (i<13) {
      document.write("<th>"+`${i}am`+"</th>");
    } else {
      document.write("<th>"+`${i-12}pm`+"</th>");
    }
  }
  if (total) {
    document.write("<th>Day total</th>");
  }
  document.write("</tr>");
}

let hour = Array(14).fill(0);
function hourlySales(store) {
  document.write("<tr>");
  document.write("<th>"+store.name+"</th>");
  let n = 0, count = 0;
  for (let i=6; i<20; i++) {
    n = store.avgPurch*randomCount(store.minCust,store.maxCust);
    store.eachHour.push(Math.round(n/store.avgPurch));
    n = Math.round(n);
    count += n;
    hour[i-6] += n;
    document.write("<td>"+n+"</td>");
  }
  document.write("<td>"+count+"</td>");
  document.write("</tr>");
}

function renderLocations(storesList) {
  storesList.forEach(store => hourlySales(store));
}

function footings() {
  document.write("<tfoot>");
  document.write("<tr>");
  document.write("<th>Total</th>");
  for (let i=6; i<20; i++) {
    document.write("<td>"+hour[i-6]+"</td>");
  }
  document.write("<td>"+hour.reduce((a,b)=>a+b)+"</td>");
  document.write("</tr>");
  document.write("</tfoot>");
}

function staff(store) {
  document.write("<tr>");
  document.write("<th>"+store.name+"</th>");
  let n = 0, count = 0;
  store.eachHour.forEach(e => {
    if (e<=40) {
      document.write("<td>2</td>");
    } else {
      document.write("<td>3</td>");
    }
  })
  document.write("</tr>");  
}

function renderStaff(storesList) {
  storesList.forEach(store => staff(store));
}

function renderStoreButton(storesList) {
  storesList.forEach(store => document.write("<button>"+store.name+"</button>"));
}
