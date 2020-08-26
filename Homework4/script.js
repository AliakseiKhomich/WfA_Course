function StdAccount(_ContributionType, _AccNumber, _PIN, _CurBalance, _CreateDate, _UserName, _UserType){
    var sContributionType = _ContributionType;
    var sAccNumber = _AccNumber;    
    var nPIN = _PIN;
    var nCurBalance = _CurBalance;
    var sCreateDate = _CreateDate;
    var sUserName = _UserName;
    var sUserType = _UserType;

    this.setAccNumber = function(_AccNumber){
        sAccNumber = _AccNumber;
    }

    this.setContributionType = function(_ContributionType) {
        sContributionType = _ContributionType;
    }

    this.setPIN = function(_PIN){
        nPIN = _PIN;
    }

    this.setCurBalance = function(_CurBalance){
        nCurBalance = _CurBalance;
    }

    this.setCreateDate = function(_CreateDate){
        sCreateDate = _CreateDate;
    }

    this.setUserName = function(_UserName){
        sUserName = _UserName;
    }

    this.setUserType = function(_UserType){
        sUserType = _UserType;
    }

    this.getAccNumber = function(){
        return sAccNumber;
    }

    this.getContributionType = function(_cOperationType){
        if ( (_cOperationType == 'C') || (_cOperationType == 'U') ) {
            return sContributionType;
        }        
    }

    this.getPIN = function(){
        return nPIN;
    }

    this.getCurBalance = function(){
        return nCurBalance;
    }

    this.getCreateDate = function(){
        return sCreateDate;
    }

    this.getUserName = function(){
        return sUserName;
    }

    this.getUserType = function(){
        return sUserType;
    }

    this.serializeObject = function (_cOperationType) {        
        return JSON.stringify({
            Account    : this.getAccNumber(),
            AccType    : this.getContributionType(_cOperationType),
            PIN        : this.getPIN(),
            Balance    : this.getCurBalance(),
            CreateDate : this.getCreateDate(),
            UserName   : this.getUserName(),
            UserType   : this.getUserType(),
        });
    }
    
    this.deserializeObject = function (_oSerializedObject) {
        var oDeserializedObject = JSON.parse(_oSerializedObject);
        
        sAccNumber = this.setAccNumber(oDeserializedObject.Account);
        sContributionType = this.setContributionType(oDeserializedObject.AccType);
        nPIN = this.setPIN(oDeserializedObject.PIN);
        nCurBalance = this.setCurBalance(oDeserializedObject.Balance);
        sCreateDate = this.setCreateDate(oDeserializedObject.CreateDate);
        sUserName = this.setUserName(oDeserializedObject.UserName);
        sUserType = this.setUserType(oDeserializedObject.UserType);
    }    
}

function CurAccount(_AccNumber, _PIN, _CurBalance, _CreateDate, _UserName, _UserType, _StoragePeriodType, _StoragePeriod){
    var nStoragePeriod = _StoragePeriod;
    var sStoragePeriodType = _StoragePeriodType;
    var args = ['Current'];
    StdAccount.apply(this, args.concat(Array.prototype.slice.call(arguments, 0, 5)));

    this.setStoragePeriod = function (_StoragePeriod) {
        nStoragePeriod = _StoragePeriod;
    }
    
    this.setStoragePeriodType = function (_StoragePeriodType) {
        sStoragePeriodType = _StoragePeriodType;
    }

    this.getStoragePeriod = function () {
        return nStoragePeriod;
    }

    this.getStoragePeriodType = function () {
        return sStoragePeriodType;
    }

    this.serializeObject = function (_cOperationType) {
        
        return JSON.stringify(
            {
                Account    : this.getAccNumber(),
                AccType    : this.getContributionType(_cOperationType),
                PIN        : this.getPIN(),
                Balance    : this.getCurBalance(),
                CreateDate : this.getCreateDate(),
                UserName   : this.getUserName(),
                UserType   : this.getUserType(),
                StoragePeriod     : this.getStoragePeriod(),
                StoragePeriodType : this.getStoragePeriodType()
            }            
        );
    }
    
    this.deserializeObject = function (_oSerializedObject) {
        var oDeserializedObject = JSON.parse(_oSerializedObject);
        
        sAccNumber = this.setAccNumber(oDeserializedObject.Account);
        sContributionType = this.setContributionType(oDeserializedObject.AccType);
        nPIN = this.setPIN(oDeserializedObject.PIN);
        nCurBalance = this.setCurBalance(oDeserializedObject.Balance);
        sCreateDate = this.setCreateDate(oDeserializedObject.CreateDate);
        sUserName = this.setUserName(oDeserializedObject.UserName);
        sUserType = this.setUserType(oDeserializedObject.UserType);

        nStoragePeriod = this.setStoragePeriodType(oDeserializedObject.StoragePeriod);
        sStoragePeriodType = this.setStoragePeriodType(oDeserializedObject.StoragePeriodType);
    }
}

function SavingsAccount(_AccNumber, _PIN, _CurBalance, _CreateDate, _UserName, _UserType, _MaxNumWithdrawalPerYear){
    var nMaxNumWithdrawalPerYear = _MaxNumWithdrawalPerYear;
    var args = ['Savings'];
    StdAccount.apply(this, args.concat(Array.prototype.slice.call(arguments, 0, 5)));

    this.setMaxNumWithdrawalPerYear = function (_MaxNumWithdrawalPerYear) {
        nMaxNumWithdrawalPerYear = _MaxNumWithdrawalPerYear;
    }
    
    this.getMaxNumWithdrawalPerYear = function () {
        return nMaxNumWithdrawalPerYear;
    }
    this.serializeObject = function (_cOperationType) {
        return JSON.stringify(
            {
                Account    : this.getAccNumber(),
                AccType    : this.getContributionType(_cOperationType),
                PIN        : this.getPIN(),
                Balance    : this.getCurBalance(),
                CreateDate : this.getCreateDate(),
                UserName   : this.getUserName(),
                UserType   : this.getUserType(),
                MaxNumWithdrawalPerYear : this.getMaxNumWithdrawalPerYear()
            }            
        );
    }
    
    this.deserializeObject = function (_oSerializedObject) {
        var oDeserializedObject = JSON.parse(_oSerializedObject);
        
        sAccNumber = this.setAccNumber(oDeserializedObject.Account);
        sContributionType = this.setContributionType(oDeserializedObject.AccType);
        nPIN = this.setPIN(oDeserializedObject.PIN);
        nCurBalance = this.setCurBalance(oDeserializedObject.Balance);
        sCreateDate = this.setCreateDate(oDeserializedObject.CreateDate);
        sUserName = this.setUserName(oDeserializedObject.UserName);
        sUserType = this.setUserType(oDeserializedObject.UserType);

        nMaxNumWithdrawalPerYear = this.setMaxNumWithdrawalPerYear(oDeserializedObject.MaxNumWithdrawalPerYear);
    }    
}

var oRadioAccType = document.getElementById('accTypeSelect');
var oRadioActionType = document.getElementById('actionTypeSelect');
var oDoAction = document.getElementById('doAction');

oRadioAccType.addEventListener('click', fChangeAccType);
oRadioActionType.addEventListener('click', fChangeAction);
oDoAction.addEventListener('click', fDoAction);

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
}

function fChangeAction(_event) {
    var selAccType = _event.target.id;

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
}

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
}

function fDoAction() {
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

    var cOperationType = fGetOperationType();
    oAccount.setAccNumber(document.getElementById('accNumber').value);

    if ((cOperationType == 'C') || (cOperationType == 'U')) {
        // Create new or update existing account 
        switch (nAccType) {
            case 1: { 
                oAccount.setContributionType('Current'); 
                oAccount.setStoragePeriod(document.getElementById('storagePeriod').value);
                oAccount.setStoragePeriodType(document.getElementById('storagePeriodType').value);
                break 
            };
            case 2: { 
                oAccount.setContributionType('Savings'); 
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

    var oSerialized = oAccount.serializeObject(cOperationType);
    console.log(oSerialized);
}