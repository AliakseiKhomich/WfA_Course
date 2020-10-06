sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"	
], function (Controller, UIComponent, JSONModel) {
	"use strict";

	return Controller.extend("ZKHO.HW7_Task1.controller.App", {
		onInit: function () {
			sap.ui.getCore().setModel(new JSONModel({}), "people");
			sap.ui.getCore().setModel(new JSONModel({}), "count");
			sap.ui.getCore().setModel(new JSONModel({}), "expand");
			sap.ui.getCore().setModel(new JSONModel({}), "orderby");
			sap.ui.getCore().setModel(new JSONModel({}), "search");
			sap.ui.getCore().setModel(new JSONModel({}), "select");
			sap.ui.getCore().setModel(new JSONModel({}), "skip");
			sap.ui.getCore().setModel(new JSONModel({}), "top");
			sap.ui.getCore().setModel(new JSONModel({}), "filter");
			sap.ui.getCore().setModel(new JSONModel({}), "filters3");
			sap.ui.getCore().setModel(new JSONModel({}), "strings3");
		}, 
		
		fGetOperationType: function(nIndex) {
			switch(nIndex) {
				case 1 :  return "expand";
				case 2 :  return "orderby";
				case 3 :  return "search";
				case 4 :  return "select";
				case 5 :  return "skip";
				case 6 :  return "top";
				case 7 :  return "filter";
				case 8 :  return "filters3";
				case 9 :  return "strings3";
				default : return "count";
			}
		},

		fGetURL: function (sTypeQuery) {
			var sServerURL = "https://services.odata.org/V4/TripPinServiceRW/";
			
		    switch(sTypeQuery) {
		        case "expand":   return sServerURL + "People('scottketchum')?$expand=Trips";
		        case "orderby":  return sServerURL + "Airlines?$orderby=AirlineCode desc";
		        case "search":   return sServerURL + "Airports?$search=California";
		        case "select":   return sServerURL + "People?$select=FirstName, LastName";
		        case "skip":     return sServerURL + "Airports?$skip=2";
		        case "top":      return sServerURL + "Airlines?$top=2";
		        case "filter":   return sServerURL + "People?$filter=startswith(FirstName, 'K')";
		        case "filters3": return sServerURL + "People?$filter=startswith(LastName, 'A') or startswith(FirstName, 'R') or endswith(LastName, 'e')";
		        case "strings3": return sServerURL + "Airports?$skip=1&$top=5&$select=Name, IataCode";
		        default :		 return sServerURL + "/Airports/$count";
		    }
		},
		
		onLoadData : function (oEvent) {
			var nIndex = this.byId("QueryType").getSelectedIndex();
			var self = this;
			var sOperationType = self.fGetOperationType(nIndex);
			
		    $.get( self.fGetURL(sOperationType), 
		        function(oData) {
		            
		            if ( nIndex <= 1 ) {
		            	var oNewModel = {value : oData};
		            	self.getView().getModel(sOperationType).setData(oNewModel);
		            }
		            else {
		            	self.getView().getModel(sOperationType).setData(oData);	
		            }
		            
	                var oFragmentToShow = self.byId(sOperationType + "RequestResult").clone();
					var oView = self.byId("queryResults");
					oView.destroyContent();
					oView.addContent(oFragmentToShow);		            		             
		        }
		    );			
		},
		onClearData: function () {
			var nIndex = this.byId("QueryType").getSelectedIndex();
			var self = this;
			var sModelName = self.fGetOperationType(nIndex);
			
			var oModel = sap.ui.getCore().getModel(sModelName);
			oModel.setData(null);
			
			var oElement = this.byId(sModelName + "RequestResult");
			oElement.bindElement({ path: "/value", model: sModelName });
		}
	});
});