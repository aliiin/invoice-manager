!function(){"use strict";function e(e,t,i,n,o){e.state("home",{url:"/",templateUrl:"/templates/home/index.html"}).state("products",{url:"/products",templateUrl:"/templates/products/list.html",controller:"ProductsController as vm"}).state("productsDetails",{url:"/products/:id",templateUrl:"/templates/products/details.html",controller:"ProductsController as vm"}).state("customers",{url:"/customers",templateUrl:"/templates/customers/list.html",controller:"CustomersController as vm"}).state("customerDetails",{url:"/customers/:id",templateUrl:"/templates/customers/details.html",controller:"CustomersController as vm"}).state("newInvoice",{url:"/invoices/new",templateUrl:"/templates/invoices/new.html",controller:"InvoicesController as vm"}).state("invoices",{url:"/invoices",templateUrl:"/templates/invoices/list.html",controller:"InvoicesController as vm"}).state("invoiceDetails",{url:"/invoices/:id",templateUrl:"/templates/invoices/details.html",controller:"InvoiceDetailsController as vm"}),t.otherwise("/invoices"),i.html5Mode({enabled:!0,requireBase:!1}),o.provider("CONFIG",function(){return{$get:function(){return{server_url:"http://localhost:8000/api"}}}})}angular.module("invoiceApp",["ui.router"]).config(e),e.$inject=["$stateProvider","$urlRouterProvider","$locationProvider","$qProvider","$provide"]}(),function(){"use strict";function e(e,t){var i=t.server_url;return{getAll:function(){return e({method:"GET",url:i+"/products"})},get:function(t){return e({method:"GET",url:i+"/products/"+t})}}}angular.module("invoiceApp").service("productService",e),e.$inject=["$http","CONFIG"]}(),function(){"use strict";function e(e,t){var i=t.server_url;return{getAll:function(){return e({method:"GET",url:i+"/invoices"})},get:function(t){return e({method:"GET",url:i+"/invoices/"+t})},save:function(t){return e({method:"POST",url:i+"/invoices/",data:t})},saveInvoiceItem:function(t,n){return e({method:"POST",url:i+"/invoices/"+t+"/items",data:n})},getInvoiceItems:function(t){return e({method:"GET",url:i+"/invoices/"+t+"/items"})}}}angular.module("invoiceApp").service("invoiceService",e),e.$inject=["$http","CONFIG"]}(),function(){"use strict";function e(e,t){var i=t.server_url;return{getAll:function(){return e({method:"GET",url:i+"/customers"})},get:function(t){return e({method:"GET",url:i+"/customers/"+t})}}}angular.module("invoiceApp").service("customerService",e),e.$inject=["$http","CONFIG"]}(),function(){"use strict";angular.module("invoiceApp").directive("limitTo",[function(){return{restrict:"A",link:function(e,t,i){var n=parseInt(i.limitTo);angular.element(t).on("keypress",function(e){this.value.length==n&&e.preventDefault()})}}}])}(),function(){"use strict";function e(e,t,i){var n=this;n.getProducts=function(){t.getAll().then(function(e){n.allProducts=e.data})},n.getProductDetails=function(){i.params&&i.params.id&&t.get(i.params.id).then(function(e){n.selectedProduct=e.data})}}angular.module("invoiceApp").controller("ProductsController",e),e.$inject=["$scope","productService","$state"]}(),function(){"use strict";function e(e,t,i,n,o){var r=this;r.getInvoiceDetails=function(){o.params&&o.params.id&&t.get(o.params.id).then(function(e){r.selectedInvoice=e.data,r.selectedInvoice.customer_id&&i.get(r.selectedInvoice.customer_id).then(function(e){r.selectedInvoice.customer=e.data}),r.selectedInvoice.id&&t.getInvoiceItems(r.selectedInvoice.id).then(function(e){r.selectedInvoice.items=e.data,angular.forEach(r.selectedInvoice.items,function(e){n.get(e.id).then(function(t){e.name=t.data.name,e.price=t.data.price})})})})}}angular.module("invoiceApp").controller("InvoiceDetailsController",e),e.$inject=["$scope","invoiceService","customerService","productService","$state"]}(),function(){"use strict";function e(e,t,i,n,o){var r=this;r.invoice={items:[]},r.getInvoices=function(){t.getAll().then(function(e){r.allInvoices=e.data})},r.loadCustomers=function(){i.getAll().then(function(e){r.allCustomers=e.data})},r.getProducts=function(){n.getAll().then(function(e){r.allProducts=e.data})},r.addProductToInvoice=function(){r.selectedProduct.isSelected=!0,r.invoice.items.push(angular.copy(r.selectedProduct))},r.removeProduct=function(e){r.invoice.items.splice(e,1)},r.invoiceSubTotal=function(){var e=0;return angular.forEach(r.invoice.items,function(t,i){var n=t.discount||0;r.invoice.discount=parseFloat(t.quantity*t.price*n/100).toFixed(2),e+=t.quantity*t.price*(100-n)/100,e=parseFloat(e).toFixed(2)}),r.invoice.total=e,e},r.saveInvoice=function(){var e={customer_id:r.selectedCustomer.id,total:r.invoice.total,discount:r.invoice.discount};delete r.selectedCustomer,t.save(e).then(function(e){var i=e.data.id;i&&angular.forEach(r.invoice.items,function(e,n){t.saveInvoiceItem(i,{product_id:e.id,quantity:e.quantity}).then(function(){n==r.invoice.items.length-1&&o.go("invoices")})})})},e.$watch("vm.invoice.items",function(e,t){e&&t&&(r.validInvoice=!1,angular.forEach(r.invoice.items,function(e){r.validInvoice=!!e.quantity}))},!0)}angular.module("invoiceApp").controller("InvoicesController",e),e.$inject=["$scope","invoiceService","customerService","productService","$state"]}(),function(){"use strict";function e(e,t,i){var n=this;n.getCustomers=function(){t.getAll().then(function(e){n.allCustomers=e.data})},n.getCustomerDetails=function(){i.params&&i.params.id&&t.get(i.params.id).then(function(e){n.selectedCustomer=e.data})}}angular.module("invoiceApp").controller("CustomersController",e),e.$inject=["$scope","customerService","$state"]}();