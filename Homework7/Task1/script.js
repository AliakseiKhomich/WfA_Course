function fGetOperationType () {
    if ((document.getElementById('count').checked)) {
        return 'count';
    };
    if ((document.getElementById('expand').checked)) {
        return 'expand';
    };
    if ((document.getElementById('orderby').checked)) {
        return 'orderby';
    };
    if ((document.getElementById('search').checked)) {
        return 'search';
    };
    if ((document.getElementById('select').checked)) {
        return 'select';
    };
    if ((document.getElementById('skip').checked)) {
        return 'skip';
    };
    if ((document.getElementById('top').checked)) {
        return 'top';
    };
    if ((document.getElementById('filter').checked)) {
        return 'filter';
    };
    if ((document.getElementById('filters3').checked)) {
        return 'filter3';
    };
    if ((document.getElementById('strings3').checked)) {
        return 'string3';
    };
};

function fFormTableCell(sName, sElemTypeName) {
    var oCell = document.createElement(sElemTypeName);
    oCell.scope = "col-5";
    oCell.innerText = sName;
    return oCell;    
};

function fFormTableRow(aElemArray, sElemTypeName) {
    var oRow = document.createElement('tr');
    for(i = 0; i < aElemArray.length; i++) {                            
        oRow.appendChild(fFormTableCell(aElemArray[i], sElemTypeName));
    };
    return oRow;   
};

function fGetFieldsArray(sTypeQuery, oElement) {
    switch(sTypeQuery) {
        case 'expand':  { return [oElement.Name, oElement.Budget, oElement.StartsAt, oElement.EndsAt, oElement.Description]; };
        case 'select':  { return [oElement.FirstName, oElement.LastName]; };
        case 'string3': { return [oElement.IataCode, oElement.Name]; };

        case 'orderby':
        case 'top':     { return [oElement.AirlineCode, oElement.Name]; };

        case 'search':
        case 'skip':    { return [oElement.IataCode, oElement.Name, oElement.Location.City.Name, oElement.Location.City.Region, oElement.Location.City.CountryRegion]; };        
        
        case 'filter':
        case 'filter3': { return [oElement.UserName, oElement.FirstName, oElement.LastName, oElement.Gender]; };
    }
};

function fGetHeaderNames(sTypeQuery){
    switch(sTypeQuery) {
        case 'expand':  { return ['Name', 'Budget', 'StartsAt', 'EndsAt', 'Description']; };
        case 'select':  { return ['FirstName', 'LastName']; };
        case 'string3': { return ['IataCode', 'Name']; };        

        case 'orderby':
        case 'top':     { return ['AirlineCode', 'Name']; };

        case 'search':
        case 'skip':    { return ['IataCode', 'Name', 'City', 'Region', 'CountryRegion']; };
        
        case 'filter':
        case 'filter3': { return ['UserName', 'FirstName', 'LastName', 'Gender'] };
    }
}

function fGetURL(sTypeQuery) {
    var sServerURL = "https://services.odata.org/V4/TripPinServiceRW/"
    switch(sTypeQuery) {
        case 'expand':  { return sServerURL + "People('scottketchum')?$expand=Trips"; };
        case 'orderby': { return sServerURL + "Airlines?$orderby=AirlineCode desc"; };
        case 'search':  { return sServerURL + "Airports?$search=California"; };
        case 'select':  { return sServerURL + "People?$select=FirstName, LastName"; };
        case 'skip':    { return sServerURL + "Airports?$skip=2"; };
        case 'top':     { return sServerURL + "Airlines?$top=2"; };
        case 'filter':  { return sServerURL + "People?$filter=startswith(FirstName, 'K')" };
        case 'filter3': { return sServerURL + "People?$filter=startswith(LastName, 'A') or startswith(FirstName, 'R') or endswith(LastName, 'e')" };
        case 'string3': { return sServerURL + "Airports?$skip=1&$top=5&$select=Name, IataCode" };
    }
};

function fDoGetQueryWithTableResults(sTypeQuery, sURL) {
    var oTable = document.getElementById('tableInfo');
    var oNewTHeader = document.createElement('thead');
    oNewTHeader.id = "queryHead";    
    var oNewTBody = document.createElement('tbody');
    oNewTBody.id = "queryResults";

    console.log("$" + sTypeQuery);
    $.get( sURL, 
        function(oData) {
            console.log('success');
            document.getElementById('queryCaption').innerText = "Results of jQuery: " + sURL;
            oNewTHeader.appendChild(fFormTableRow(fGetHeaderNames(sTypeQuery), 'th'));
            oTable.replaceChild(oNewTHeader, document.getElementById('queryHead'));
            var oDataValues;
            switch (sTypeQuery) {
                case 'expand': { oDataValues = oData.Trips; break; };
                default      : oDataValues = oData.value;
            };

            oDataValues.forEach(element => {
                oNewTHeader.appendChild( fFormTableRow( fGetFieldsArray( sTypeQuery, element ), 'td'));
            });
            oTable.replaceChild(oNewTBody, document.getElementById('queryResults'));
            
            console.log(oData);
        }
    );
};

function fDoAction() {

    var sOperationType = fGetOperationType();

    switch (sOperationType) {
        case 'count': {
    
            console.log('$count');
            $.get(  "https://services.odata.org/V4//TripPinServiceRW/Airports/$count", 
                    function(oData) {
                        console.log('success');
                        var oResultField = document.getElementById('CountResult');
                        oResultField.value = oData;
                        console.log(oData);
                    }
            );
            break;
        };
        default: fDoGetQueryWithTableResults(sOperationType, fGetURL(sOperationType));
    }
};

$(function(){

    $('#doAction').click( function(ev) {
        ev.preventDefault();
        fDoAction(); 
      });

})