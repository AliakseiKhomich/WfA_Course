function StdAccount (_ContributionType, _AccNumber, _PIN, _CurBalance, _CreateDate, _UserName, _UserType) {
    this.sContributionType = _ContributionType;
    this.sAccNumber = _AccNumber;    
    this.nPIN = _PIN;
    this.nCurBalance = _CurBalance;
    this.sCreateDate = _CreateDate;
    this.sUserName = _UserName;
    this.sUserType = _UserType;
};

StdAccount.prototype.setAccNumber = function(_AccNumber) {
    this.sAccNumber = _AccNumber;
};

StdAccount.prototype.setContributionType = function(_ContributionType) {
    this.sContributionType = _ContributionType;
};

StdAccount.prototype.setPIN = function(_PIN) {
    this.nPIN = _PIN;
};

StdAccount.prototype.setCurBalance = function(_CurBalance) {
    this.nCurBalance = _CurBalance;
};

StdAccount.prototype.setCreateDate = function(_CreateDate) {
    this.sCreateDate = _CreateDate;
};

StdAccount.prototype.setUserName = function(_UserName) {
    this.sUserName = _UserName;
};

StdAccount.prototype.setUserType = function(_UserType)  {
    this.sUserType = _UserType;
};

StdAccount.prototype.getAccNumber = function() {
    return this.sAccNumber;
};

StdAccount.prototype.getContributionType = function(_OperationType) {
    if ( (_OperationType === 'C') || (_OperationType === 'U') ) {
        return this.sContributionType;
    };
};

StdAccount.prototype.getPIN = function () {
    return this.nPIN;
};

StdAccount.prototype.getCurBalance = function() {
    return this.nCurBalance;
};

StdAccount.prototype.getCreateDate = function() {
    return this.sCreateDate;
};

StdAccount.prototype.getUserName = function() {
    return this.sUserName;
};

StdAccount.prototype.getUserType = function() {
    return this.sUserType;
};

StdAccount.prototype.serializeObject = function (_OperationType) {
    return JSON.stringify({
        contributionType : this.getContributionType(_OperationType),
        accNumber        : this.getAccNumber(),
        pin              : this.getPIN(),
        curBalance       : this.getCurBalance(),
        createDate       : this.getCreateDate(),
        userName         : this.getUserName(),
        userType         : this.getUserType(),
    });
};

StdAccount.prototype.deserializeObject = function (_oSerializedObject) {
    return JSON.parse(_oSerializedObject);
};

function CurAccount(_AccNumber, _PIN, _CurBalance, _CreateDate, _UserName, _UserType, _StoragePeriodType, _StoragePeriod) {
    this.nStoragePeriod = _StoragePeriod;
    this.sStoragePeriodType = _StoragePeriodType;
    var args = ['Current'];
    StdAccount.apply(this, args.concat(Array.prototype.slice.call(arguments, 0, 5)));
};

CurAccount.prototype = Object.create(StdAccount.prototype);
CurAccount.prototype.constructor = CurAccount;

CurAccount.prototype.setStoragePeriod = function(_StoragePeriod){
    this.nStoragePeriod = _StoragePeriod;
};

CurAccount.prototype.setStoragePeriodType = function(_StoragePeriodType) {
    this.sStoragePeriodType = _StoragePeriodType;
};

CurAccount.prototype.getStoragePeriod = function() {
    return this.nStoragePeriod;
};

CurAccount.prototype.getStoragePeriodType = function() {
    return this.sStoragePeriodType;
};

CurAccount.prototype.serializeObject = function (_OperationType) {
    return JSON.stringify(
        {
            contributionType : this.getContributionType(_OperationType),
            accNumber        : this.getAccNumber(),
            pin              : this.getPIN(),
            curBalance       : this.getCurBalance(),
            createDate       : this.getCreateDate(),
            userName         : this.getUserName(),
            userType         : this.getUserType(),
            storagePeriod     : this.getStoragePeriod(),
            storagePeriodType : this.getStoragePeriodType()
        }            
    );
};

function SavingsAccount(_AccNumber, _PIN, _CurBalance, _CreateDate, _UserName, _UserType, _MaxNumWithdrawalPerYear){
    this.nMaxNumWithdrawalPerYear = _MaxNumWithdrawalPerYear;    
    var args = ['Savings'];
    StdAccount.apply(this, args.concat(Array.prototype.slice.call(arguments, 0, 5)));
}

SavingsAccount.prototype = Object.create(StdAccount.prototype);
SavingsAccount.prototype.constructor = SavingsAccount;

SavingsAccount.prototype.setMaxNumWithdrawalPerYear = function(_MaxNumWithdrawalPerYear) {
    this.nMaxNumWithdrawalPerYear = _MaxNumWithdrawalPerYear;
};

SavingsAccount.prototype.geMaxNumWithdrawalPerYear = function() {
    return this.nMaxNumWithdrawalPerYear;
};

SavingsAccount.prototype.serializeObject = function (_OperationType) {    
    return JSON.stringify(
        {
            contributionType : this.getContributionType(_OperationType),
            accNumber        : this.getAccNumber(),
            pin              : this.getPIN(),
            curBalance       : this.getCurBalance(),
            createDate       : this.getCreateDate(),
            userName         : this.getUserName(),
            userType         : this.getUserType(),
            maxNumWithdrawalPerYear : this.geMaxNumWithdrawalPerYear()
        }            
    );
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
    if (document.getElementById('CurrentAcc').checked){
        nAccType = 1;
        oAccount = new CurAccount();
    }
    if (document.getElementById('SavingsAcc').checked){
        nAccType = 2;
        oAccount = new SavingsAccount();
    }

    var sOperationType = fGetOperationType();
    oAccount.setAccNumber(document.getElementById('accNumber').value);

    if ((sOperationType === 'C') || (sOperationType === 'U')) {
        // Create new or update existing account 
        switch (nAccType) {
            case 1: { 
                oAccount.setStoragePeriod(document.getElementById('storagePeriod').value);
                oAccount.setStoragePeriodType(document.getElementById('storagePeriodType').value);
                break 
            };
            case 2: { 
                oAccount.setMaxNumWithdrawalPerYear(document.getElementById('withdrawalPerYear').value);
                break 
            };
            default: { 
                oAccount.setContributionType('Undefined'); 
                break 
            };
        }
        oAccount.setPIN(document.getElementById('PIN').value);
        oAccount.setCurBalance(document.getElementById('curBalance').value);
        oAccount.setCreateDate(document.getElementById('createDate').value);
        oAccount.setUserName(document.getElementById('userName').value);
        oAccount.setUserType(document.getElementById('userType').value);         
    }

    var oSerialized = oAccount.serializeObject(sOperationType);
    console.log(oSerialized);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = 600000;

    switch (sOperationType) {
        case 'C': {
            console.log('Create (POST)');
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log('Server response: ' + this.responseText);
                    document.getElementById("AccForm").dispatchEvent(new Event('submit'));
                }
            });
        
            xhr.open("POST", "http://localhost:2403/accounts/");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(oSerialized);
            break;
        };
        case 'R': {
            console.log('Read (GET)');
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                    oReceivedAccounts = oAccount.deserializeObject(this.response);
                    var oNewTBody = document.createElement('tbody');
                    oReceivedAccounts.map(function(nthAccount) {
                        oNewTBody.appendChild(parseAccountsToTableRow(nthAccount));
                    });
        
                    var oCurTable = document.getElementById('AccTable').parentElement;
                    oCurTable.replaceChild(oNewTBody, document.getElementById('AccTable'));
                    oNewTBody.id = 'AccTable';
                    console.log('Rows have been successfully added to the table.');
                }
            });
        
            xhr.open("GET", "http://localhost:2403/accounts/");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
            break;
        }
        case 'U': {
            console.log('Update (PUT)');
            event.preventDefault();  
            console.log(oSerialized);
        
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });
                    
            xhr.open("PUT", "http://localhost:2403/accounts/" + document.getElementById("accID").value);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(oSerialized);
            break;
        }
        case 'D': {
            console.log('Delete (DELETE)');
            event.preventDefault();
       
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });
        
            xhr.open("DELETE", "http://localhost:2403/accounts/" + document.getElementById("accID").value);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
            break;
        }
    };
};

function parseAccountsToTableRow(_Accounts){
    var row = document.createElement('tr');

    idAccount = document.createElement('td');
    idAccount.innerText = _Accounts['id'];
    row.appendChild(idAccount);    
    
    ContributionType = document.createElement('td');
    ContributionType.innerText = _Accounts['contributionType'];
    row.appendChild(ContributionType);

    AccNumber = document.createElement('td');
    AccNumber.innerText = _Accounts['accNumber'];
    row.appendChild(AccNumber);
   
    CreateDate = document.createElement('td');
    CreateDate.innerText = _Accounts['createDate'];
    row.appendChild(CreateDate);

    CurBalance = document.createElement('td');
    CurBalance.innerText = _Accounts['curBalance'];
    row.appendChild(CurBalance);

    UserType = document.createElement('td');
    UserType.innerText = _Accounts['userType'];
    row.appendChild(UserType);
    
    UserName = document.createElement('td');
    UserName.innerText = _Accounts['userName'];
    row.appendChild(UserName);

    return row;
}

var oRadioAccType = document.getElementById('accTypeSelect');
var oRadioActionType = document.getElementById('actionTypeSelect');
var oDoAction = document.getElementById('doAction');

oRadioAccType.addEventListener('click', fChangeAccType);
oRadioActionType.addEventListener('click', fChangeAction);
oDoAction.addEventListener('click', fDoAction);