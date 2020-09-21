class StdAccount {
    constructor (ContributionType, AccNumber, PIN, CurBalance, CreateDate, UserName, UserType) {
        this._sContributionType = ContributionType;
        this._sAccNumber = AccNumber;    
        this._nPIN = PIN;
        this._nCurBalance = CurBalance;
        this._sCreateDate = CreateDate;
        this._sUserName = UserName;
        this._sUserType = UserType;
        this._sOperationType = '';
    }

    serializeObject() {
        return ({
            contributionType : this._sContributionType,
            accNumber        : this._sAccNumber,
            pin              : this._nPIN,
            curBalance       : this._nCurBalance,
            createDate       : this._sCreateDate,
            userName         : this._sUserName,
            userType         : this._sUserType
        });
    };
    
    deserializeObject(oSerializedObject) {
        return JSON.parse(oSerializedObject);
    };

    set sAccNumber(AccNumber){
        this._sAccNumber = AccNumber;
    };
    get sAccNumber() {
        return this._sAccNumber;
    };

    set sContributionType(ContributionType) {
        this._sContributionType = ContributionType;
    };
    get sContributionType() {
        if ( (this._sOperationType === 'C') || (this._sOperationType === 'U') ) {
            return this._sContributionType;
        };
    };

    set nPIN(PIN) {
        this._nPIN = PIN;
    };
    get nPIN() {
        return this._nPIN;
    };

    set nCurBalance(CurBalance) {
        this._nCurBalance = CurBalance;
    };
    get nCurBalance() {
        return this._nCurBalance;
    };

    set sCreateDate(CreateDate) {
        this._sCreateDate = CreateDate;
    };
    get sCreateDate() {
        return this._sCreateDate;
    }

    set sUserName(UserName) {
        this._sUserName = UserName;
    };
    get sUserName() {
        return this._sUserName;
    };

    set sUserType(UserType) {
        this._sUserType = UserType;
    }
    get sUserType() {
        return this._sUserType;
    }
    
    set sOperationType (OperationType) {
        this._sOperationType = OperationType;
    }
    get sOperationType() {
        return this._sOperationType;
    }
};

class CurAccount extends StdAccount {
    constructor(AccNumber, PIN, CurBalance, CreateDate, UserName, UserType, StoragePeriodType, StoragePeriod){
        super('Current', AccNumber, PIN, CurBalance, CreateDate, UserName, UserType);
        this._nStoragePeriod = StoragePeriod;
        this._sStoragePeriodType = StoragePeriodType;
    }

    serializeObject () {
        return ({
            contributionType : this._sContributionType,
            accNumber        : this._sAccNumber,
            pin              : this._nPIN,
            curBalance       : this._nCurBalance,
            createDate       : this._sCreateDate,
            userName         : this._sUserName,
            userType         : this._sUserType,
            storagePeriod     : this._nStoragePeriod,
            storagePeriodType : this._sStoragePeriodType
        });
    };    
    
    set nStoragePeriod(StoragePeriod) {
        this._nStoragePeriod = StoragePeriod;
    };
    get nStoragePeriod(){
        return this._nStoragePeriod;
    }

    set sStoragePeriodType(StoragePeriodType) {
        this._sStoragePeriodType = StoragePeriodType;
    }
    get sStoragePeriodType() {
        return this._sStoragePeriodType;
    }
};

class SavingsAccount extends StdAccount {
    constructor(AccNumber, PIN, CurBalance, CreateDate, UserName, UserType, MaxNumWithdrawalPerYear) {
        super('Savings', AccNumber, PIN, CurBalance, CreateDate, UserName, UserType);

        var args = ['Savings'];
        super(args.concat(Array.prototype.slice.call(arguments, 0, 5)))
        this._nMaxNumWithdrawalPerYear = MaxNumWithdrawalPerYear;
    }

    serializeObject () {    
        return ({
            contributionType : this._sContributionType,
            accNumber        : this._sAccNumber,
            pin              : this._nPIN,
            curBalance       : this._nCurBalance,
            createDate       : this._sCreateDate,
            userName         : this._sUserName,
            userType         : this._sUserType,
            maxNumWithdrawalPerYear : this._nMaxNumWithdrawalPerYear
        });
    };

    set nMaxNumWithdrawalPerYear(MaxNumWithdrawalPerYear){
        this._nMaxNumWithdrawalPerYear = MaxNumWithdrawalPerYear;
    }
    get nMaxNumWithdrawalPerYear(){
        return this._nMaxNumWithdrawalPerYear;
    }
};

function fChangeAccType(_event) {
    var selAccType = _event.target.id;

    switch (selAccType) {
        case 'CurrentAcc': {
            document.getElementById('withdrawalPerYearInfo').hidden = true;
            if ((document.getElementById('CreateAcc').checked) ||
                (document.getElementById('UpdateAcc').checked)) {                    
                    document.getElementById('storageInfo').hidden = false;
            }
            break;
        };
        case 'SavingsAcc': {
            if ((document.getElementById('CreateAcc').checked) ||
                (document.getElementById('UpdateAcc').checked)) {
                    document.getElementById('withdrawalPerYearInfo').hidden = false;                    
            }
            document.getElementById('storageInfo').hidden = true;
            break;
        }
    }
};

function fChangeAction(_event) {
    var selAccType = _event.target.id;

    if ( selAccType === 'CreateAcc' ) {
        document.getElementById('accIDGroup').hidden = true;
    }
    else {
        document.getElementById('accIDGroup').hidden = false;
    }    

    switch (selAccType) {
        case 'CreateAcc': 
        case 'UpdateAcc': {
            document.getElementById('createDateInfo').hidden = false;
            document.getElementById('userInfo').hidden = false;
            document.getElementById('PIN').hidden = false;
            document.getElementById('balanceInfo').hidden = false;

            if (document.getElementById('CurrentAcc').checked) {
                document.getElementById('storageInfo').hidden = false;                
                document.getElementById('withdrawalPerYearInfo').hidden = true;
            }
            else {
                document.getElementById('storageInfo').hidden = true;
                document.getElementById('withdrawalPerYearInfo').hidden = false;
            }
            break;
        };
        case 'ReadAcc': 
        case 'DeleteAcc': {            
            document.getElementById('createDateInfo').hidden = true;
            document.getElementById('userInfo').hidden = true;
            document.getElementById('PIN').hidden = true;
            document.getElementById('balanceInfo').hidden = true;
            document.getElementById('storageInfo').hidden = true;
            document.getElementById('withdrawalPerYearInfo').hidden = true;
            break;
        };
    }    
};

function fGetOperationType () {
    if ((document.getElementById('CreateAcc').checked)) {
        return 'C';
    };
    if ((document.getElementById('ReadAcc').checked)) {
        return 'R';
    };
    if ((document.getElementById('UpdateAcc').checked)) {
        return 'U';
    };
    if ((document.getElementById('DeleteAcc').checked)) {
        return 'D';
    };
};

function fDoAction(event) {
    var nAccType = 0;
    var oAccount;
    if ( $('#CurrentAcc').attr("checked") ) {
        nAccType = 1;
        oAccount = new CurAccount();
    }
    if ( $('#SavingsAcc').attr("checked") ) {
        nAccType = 2;
        oAccount = new SavingsAccount();
    }

    var sOperationType = fGetOperationType();
    oAccount.sAccNumber = $('#accNumber').val();    
    
    if ((sOperationType === 'C') || (sOperationType === 'U')) {
        // Create new or update existing account 
        switch (nAccType) {
            case 1: { 
                oAccount.nStoragePeriod = $('#storagePeriod').val();
                oAccount.sStoragePeriodType = $('#storagePeriodType').val();
                break 
            };
            case 2: { 
                oAccount.nMaxNumWithdrawalPerYear = $('#withdrawalPerYear').val();
                break 
            };
            default: { 
                oAccount.sContributionType = 'Undefined';
                break 
            };
        }
        oAccount.nPIN = $('#PIN').val();
        oAccount.sCreateDate = $('#createDate').val();
        oAccount.nCurBalance = $('#curBalance').val();
        oAccount.sUserName = $('#userName').val();
        oAccount.sUserType = $('#userType').val();
    }

    oAccount.sOperationType = sOperationType;
    var oSerialized = oAccount.serializeObject();
    console.log(oSerialized);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = 600000;

    switch (sOperationType) {
        case 'C': {
            console.log('Create (POST)');
            console.log(oSerialized);
            $.ajax({
                url: "http://localhost:2403/accounts/",
                type: 'POST',
                datatype: 'json',
                data: oSerialized,
                success: function(response) {
                    console.log('Server response: ');
                    console.log(response);                    
                    $('#AccTable').append(fAddRowToTable(response));
                    console.log('Account have been successfully created.');
                },
                error: function(response) {
                    console.log("Request's error!");
                    console.log(response);
                }
            });
            break;
        };
        case 'R': {
            console.log('Read (GET)');
            console.log(oSerialized);            
            $.ajax({
                url: "http://localhost:2403/accounts/",
                type: 'GET',
                datatype: "json",
                success: function(response) {
                    console.log('Server response: ');
                    console.log(response);
                    $('#AccTable').empty();
                    for(let i=0; i<response.length; i++ ) {
                        $('#AccTable').append(fAddRowToTable(response[i]));
                    };
                    console.log('Rows have been successfully added to the table.');                    
                },
                error: function(response) {
                    console.log("Request's error!");
                    console.log(response);
                }                
            });
            break;        
        }
        case 'U': {
            console.log('Update (PUT)');
            console.log(oSerialized);
            let sID = $('#accID').val();
            $.ajax({
                url: "http://localhost:2403/accounts/" + sID,
                type: 'PUT',
                datatype:"json",
                data: oSerialized,                
                success: function(response) {
                    console.log("Success!");                    
                    $(`tr:contains(${sID})`).remove();
                    $('#AccTable').append(fAddRowToTable(response));
                    console.log(response); 
                },
                error: function(response) {
                    console.log("Request's error!");                    
                    console.log(response);
                }
            });
            break;            
        }
        case 'D': {
            console.log('Delete (DELETE)');
            console.log(oSerialized);
            let sID = $('#accID').val();
            $.ajax({
                url: "http://localhost:2403/accounts/" + sID,
                type: 'DELETE',
                datatype:"json",
                success: function(response) {
                    console.log("Success!");                    
                    $(`tr:contains(${sID})`).remove();
                    console.log(response);                    
                },
                error: function(response) {
                    console.log("Request's error!");                    
                    console.log(response);
                }
            });            
            break;
        }
    };
};

function fAddCellToTableRow(sText) {
    return '<td>' + sText + '</td>'
};

function fFormRowForTable(oResponse) {
    var aResponse = [oResponse.id, oResponse.contributionType, oResponse.accNumber, oResponse.createDate, oResponse.curBalance, oResponse.userType, oResponse.userName];
    var sRow = '';
    for(let i=0; i<aResponse.length; i++) {
        sRow = sRow + fAddCellToTableRow(aResponse[i]);
    };
    return sRow;    
};

function fAddRowToTable(oResponse) {
    return '<tr>' + fFormRowForTable(oResponse) + '</tr>';
};

$(function(){
    $('#doAction').click( function(event) {
        event.preventDefault();
        fDoAction(event); 
      });

})

var oRadioAccType = document.getElementById('accTypeSelect');
var oRadioActionType = document.getElementById('actionTypeSelect');

oRadioAccType.addEventListener('click', fChangeAccType);
oRadioActionType.addEventListener('click', fChangeAction);