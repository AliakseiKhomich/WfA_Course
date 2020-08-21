function StdAccount(AccNumber, ContributionType, PIN, CurBalance, CreateDate, UserName, UserType){
    var sAccNumber = AccNumber;
    var sContributionType = ContributionType;
    var nPIN = PIN;
    var nCurBalance = CurBalance;
    var sCreateDate = CreateDate;
    var sUserName = UserName;
    var sUserType = UserType;

    this.setAccNumber = function(AccNumber){
        sAccNumber = AccNumber;
    }

    this.setContributionType = function(ContributionType) {
        sContributionType = ContributionType;
    }

    this.setPIN = function(PIN){
        nPIN = PIN;
    }

    this.setCurBalance = function(CurBalance){
        nCurBalance = CurBalance;
    }

    this.setCreateDate = function(CreateDate){
        sCreateDate = CreateDate;
    }

    this.setUserName = function(UserName){
        sUserName = UserName;
    }

    this.setUserType = function(UserType){
        sUserType = UserType;
    }

    this.getAccNumber = function(){
        return sAccNumber;
    }

    this.getContributionType = function(cOperationType){
        if ( (cOperationType == 'C') || (cOperationType == 'U') ) {
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

    this.serializeObject = function (cOperationType) {        
        return JSON.stringify({
            Account    : this.getAccNumber(),
            AccType    : this.getContributionType(cOperationType),
            PIN        : this.getPIN(),
            Balance    : this.getCurBalance(),
            CreateDate : this.getCreateDate(),
            UserName   : this.getUserName(),
            UserType   : this.getUserType(),
        });
    }
    
    this.deserializeObject = function (oSerializedObject) {
        var oDeserializedObject = JSON.parse(oSerializedObject);
        
        sAccNumber = this.setAccNumber(oDeserializedObject.Account);
        sContributionType = this.setContributionType(oDeserializedObject.AccType);
        nPIN = this.setPIN(oDeserializedObject.PIN);
        nCurBalance = this.setCurBalance(oDeserializedObject.Balance);
        sCreateDate = this.setCreateDate(oDeserializedObject.CreateDate);
        sUserName = this.setUserName(oDeserializedObject.UserName);
        sUserType = this.setUserType(oDeserializedObject.UserType);
    }    
}

function CurAccount(AccNumber, PIN, CurBalance, CreateDate, UserName, UserType, StoragePeriodType, StoragePeriod){
    var nStoragePeriod = StoragePeriod;
    var sStoragePeriodType = StoragePeriodType;
    StdAccount.call(this, AccNumber, 'Current', PIN, CreateDate, UserName, UserType);

    this.setStoragePeriod = function (StoragePeriod) {
        nStoragePeriod = StoragePeriod;
    }
    
    this.setStoragePeriodType = function (StoragePeriodType) {
        sStoragePeriodType = StoragePeriodType;
    }

    this.getStoragePeriod = function () {
        return nStoragePeriod;
    }

    this.getStoragePeriodType = function () {
        return sStoragePeriodType;
    }

    this.serializeObject = function (cOperationType) {
        
        return JSON.stringify(
            {
                Account    : this.getAccNumber(),
                AccType    : this.getContributionType(cOperationType),
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
    
    this.deserializeObject = function (oSerializedObject) {
        var oDeserializedObject = JSON.parse(oSerializedObject);
        
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

function SavesAccount(AccNumber, PIN, CurBalance, CreateDate, UserName, UserType, MaxNumWithdrawalPerYear){
    var nMaxNumWithdrawalPerYear = MaxNumWithdrawalPerYear;
    StdAccount.call(this, AccNumber, 'Saves', PIN, CreateDate, UserName, UserType);

    this.setMaxNumWithdrawalPerYear = function (MaxNumWithdrawalPerYear) {
        nMaxNumWithdrawalPerYear = MaxNumWithdrawalPerYear;
    }
    
    this.geMaxNumWithdrawalPerYear = function () {
        return nMaxNumWithdrawalPerYear;
    }
    this.serializeObject = function (cOperationType) {
        return JSON.stringify(
            {
                Account    : this.getAccNumber(),
                AccType    : this.getContributionType(cOperationType),
                PIN        : this.getPIN(),
                Balance    : this.getCurBalance(),
                CreateDate : this.getCreateDate(),
                UserName   : this.getUserName(),
                UserType   : this.getUserType(),
                MaxNumWithdrawalPerYear : this.geMaxNumWithdrawalPerYear()
            }            
        );
    }
    
    this.deserializeObject = function (oSerializedObject) {
        var oDeserializedObject = JSON.parse(oSerializedObject);
        
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

function fChangeAccType(event) {
    var selAccType = event.target.id;

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

function fChangeAction(event) {
    var selAccType = event.target.id;

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

function fDoAction(event) {
    var nAccType = 0;
    var oAccount;
    if (document.getElementById('CurrentAcc').checked){
        nAccType = 1;
        oAccount = new CurAccount();
    }
    if (document.getElementById('SavingsAcc').checked){
        nAccType = 2;
        oAccount = new SavesAccount();
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