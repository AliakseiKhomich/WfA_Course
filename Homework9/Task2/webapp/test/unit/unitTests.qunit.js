/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZKHO/HW9_Task2/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});