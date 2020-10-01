sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"	
], function (Controller, UIComponent, JSONModel) {
	"use strict";

	return Controller.extend("ZKHO.HW9_Task2.controller.App", {
		onInit: function () {
			var oPeopleModel = new JSONModel({});
			sap.ui.getCore().setModel(oPeopleModel, "people");
		}, 
		onLoadData : function () {
			var oModel = sap.ui.getCore().getModel("people");
			$.ajax({
				type: "GET",
				url:"https://services.odata.org/TripPinRESTierService/People",
				dataType: "json",
				success: oResponse => {
					oModel.setData(oResponse);
					console.log(oResponse.value);
					var oPeopleList = this.byId("peopleList");
					oPeopleList.bindElement({ path: "/People", model: "people" });
				},
				error: oResponse => {
					console.log(oResponse.value);
				}
			});
		},
		onClearData: function () {
			var oModel = sap.ui.getCore().getModel("people");
			oModel.setData(null);
			
			var oPeopleList = this.byId("peopleList");
			oPeopleList.bindElement({ path: "/People", model: "people" });
		}
	});
});