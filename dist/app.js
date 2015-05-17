"use strict";angular.module("licenseManager",["ngRoute","ngResource","ui.materialize","uiGmapgoogle-maps","angular-loading-bar","licenseManager.shared","licenseManager.license.controllers","licenseManager.license.routes","licenseManager.license.services"]).config(["$routeProvider",function(a){a.otherwise({redirectTo:"/"})}]).config(["cfpLoadingBarProvider",function(a){a.includeSpinner=!1}]),angular.module("licenseManager.license.controllers",[]).controller("LicenseListCtrl",["$scope","$filter","$location","License","mapDataService","localStorageService",function(a,b,c,d,e,f){function g(){a.filtered=b("filter")(a.licenses,a.searchString),e.fromLicenses(a)}a.licenses=d.query(function(){g()}),a.$watch("searchString",function(){g()}),a.viewLicense=function(b){a.$apply(function(){c.path(["/view/",b].join(""))})},a.showMap="",a.welcomeViewed=f.getItem("welcomeViewed"),a.search=function(){a.clearSearch(),a.searching=!0},a.cancelSearch=function(){a.clearSearch(),a.searching=!1},a.clearSearch=function(){a.searchString=""},a.dimissWelcome=function(){a.welcomeViewed=!0,f.setItem("welcomeViewed")}}]).controller("LicenseViewCtrl",["$scope","$routeParams","$location","License","messageService","mapDataService","errorHandlerService",function(a,b,c,d,e,f,g){a.license=d.get({id:b.id},function(){f.fromLicense(a)}),a.deleteLicense=function(){e.confirm("Do you really want to delete this license?")&&d["delete"]({id:a.license._id},function(){e.message("License deleted."),c.path("/")},g.handleServerResponse)}}]).controller("LicenseCreateCtrl",["$scope","$location","License","selectBoxService","mapDataService","errorHandlerService","messageService",function(a,b,c,d,e,f,g){a.license=new c,a.wellTypes=d.wellTypes,a.statuses=d.statuses,a.license.latitude=51.013117,a.license.longitude=-114.0741556,a.license.status="active",e.fromLicense(a,!0),a.addLicense=function(){return a.licenseForm.$valid?void a.license.$save(function(){g.message("License created."),b.path("/")},f.handleServerResponse):void g.error("There are errors in the form.")}}]).controller("LicenseEditCtrl",["$scope","$location","$routeParams","mapDataService","messageService","License","selectBoxService","errorHandlerService",function(a,b,c,d,e,f,g,h){a.license=f.get({id:c.id},function(){d.fromLicense(a,!0)}),a.wellTypes=g.wellTypes,a.statuses=g.statuses,a.updateLicense=function(){if(!a.licenseForm.$valid)return void e.error("There are errors in the form.");var c=angular.copy(a.license),d=c._id;delete c._id,delete c.dateModified,delete c.dateIssued,f.update({id:d},c,function(){b.path("/"),e.message("License updated.")},h.handleServerResponse)}}]),angular.module("licenseManager.license.routes",["ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"/components/license/views/list.html",controller:"LicenseListCtrl"}).when("/view/:id",{templateUrl:"/components/license/views/view.html",controller:"LicenseViewCtrl"}).when("/create",{templateUrl:"/components/license/views/create.html",controller:"LicenseCreateCtrl"}).when("/edit/:id",{templateUrl:"/components/license/views/edit.html",controller:"LicenseEditCtrl"})}]),angular.module("licenseManager.license.services",["ngResource"]).factory("License",["$resource",function(a){return a("http://petrofeed-coding-challenge.herokuapp.com/licenses/:id",null,{update:{method:"PUT"},"delete":{method:"DELETE"},query:{method:"GET",isArray:!0,cache:!1}})}]),angular.module("licenseManager.shared",[]).service("selectBoxService",function(){this.wellTypes=["New Field Wildcat","New Pool Wildcat","Deeper Pool Test","Shallower Pool Test","Development Well"],this.statuses=["active","confidential","expired"]}),angular.module("licenseManager.shared").service("messageService",["$window",function(a){this.confirm=function(b){return a.confirm(b)},this.message=function(a){Materialize.toast(a,4e3)},this.error=function(a){Materialize.toast(a,6e3,"red")}}]),angular.module("licenseManager.shared").service("mapDataService",function(){function a(a){return["assets/img/marker-",a,".svg"].join("")}var b={scrollwheel:!1,streetViewControl:!1,mapTypeControl:!1};this.fromLicense=function(c,d){c.map={center:{latitude:c.license.latitude,longitude:c.license.longitude},zoom:8,marker:{key:c.license._id||"key",icon:a(c.license.status)},options:b},c.marker={id:c.license._id||"key",coords:{latitude:c.license.latitude,longitude:c.license.longitude},options:{draggable:d,icon:a(c.license.status)},events:{dragend:function(a){c.license.latitude=a.getPosition().lat(),c.license.longitude=a.getPosition().lng()}}}},this.fromLicenses=function(c){c.markers=[];for(var d,e,f,g,h=[],i=0;i<c.filtered.length;i++){var j=c.filtered[i];(!d||d<j.latitude)&&(d=j.latitude),(!f||f<j.longitude)&&(f=j.longitude),(!e||e>j.latitude)&&(e=j.latitude),(!g||g>j.longitude)&&(g=j.longitude),h.push({latitude:j.latitude,longitude:j.longitude,title:j.company,id:j._id,icon:a(j.status)})}c.map||(c.map={center:{latitude:(d-e)/2+e,longitude:(f-g)/2+g},zoom:8},c.options=b),c.markers=h}}),angular.module("licenseManager.shared").service("errorHandlerService",["messageService",function(a){this.handleServerResponse=function(b){if(b.data&&b.data.errors&&b.data.errors.length)for(var c=0;c<b.data.errors.length;c++)a.error(b.data.errors[c])}}]),angular.module("licenseManager.shared").service("localStorageService",["$window",function(a){this.getItem=function(b){return a.localStorage.getItem(b)},this.setItem=function(b,c){return a.localStorage.setItem(b,c)}}]);