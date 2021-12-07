'use strict';

function Store(name, min, max, avg) {
  this.name = name;
  this.minCust = min;
  this.maxCust = max;
  this.avgPurch = avg;
}

let seattle = new Store('Seattle',23,65,6.3);
let tokyo = new Store('Tokyo',3,24,1.2);
let dubai = new Store('Dubai',11,38,3.7);
let paris = new Store('Paris',20,38,2.3);
let lima = new Store('Lima',2,16,4.6);

function randomCount(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}

function hourlySales(store) {
  document.write("<div>");
  document.write(store.name);
  document.write("<br>"+"<br>");
  let n = 0, count = 0;
  for (let i=6; i<20; i++) {
    n = Math.round(store.avgPurch*randomCount(store.minCust,store.maxCust));
    count += n;
    if (i<13) {
      document.write(`${i}am: ${n} cookies`+"<br>");
    } else {
      document.write(`${i-12}pm: ${n} cookies`+"<br>");
    }
  }
  document.write("<br>"+`Total: ${count} cookies`);
  document.write("</div>");
}

hourlySales(seattle);
hourlySales(tokyo);
hourlySales(dubai);
hourlySales(paris);
hourlySales(lima);