const cPlayersKey = "players"; const cNewPlayerText = "Create New Player";
let players, currentPlayerName, ratingSystem;
const cCB = "Center Back"; const cSt = "Striker"; const cW = "Wing"; const cWM = "Wide Mid"; const cCM = "Center Mid"; const cFB = "Full Back";
let positions = [cSt,cW,cCM,cWM,cCB,cFB]; 
let chemStyles = ['Basic','Sniper','Finisher','Deadeye','Marksman','Hawk','Artist','Architect','Powerhouse','Maestro','Engine'
    ,'Sentinel','Guardian','Gladiator','Backbone','Anchor','Hunter', 'Catalyst','Shadow'];
let onlyOwned = true;

$(function () {
    console.log("Code Loaded");

    //load the players from localStorage.  if no players create an empty array
    players = JSON.parse(localStorage.getItem(cPlayersKey)) ?? [];

    calcAllPlayerRatings();
    bindGrid();
    showGrid();

    //add standard positions to role list
    positions.forEach((pos) => {
        let newOption = $("<option></option>").val(pos).text(pos);
        $("#rolePlusPlusPositions").append(newOption);
    });

    //add CAM and CDM to role list
    let newOption = $("<option></option>").val('CAM').text('CAM');
    $("#rolePlusPlusPositions").append(newOption);
    newOption = $("<option></option>").val('CDM').text('CDM');
    $("#rolePlusPlusPositions").append(newOption);

    //#region event binding
    $("#btnSave").on("click", "", function () {
        savePlayer();


        //todo: only need to do this for the current player not all.  Performance issue
        calcAllPlayerRatings();


        bindGrid();
        showGrid();
        currentPlayerName = null;
    });

    $("#btnCancel").on("click", "", function () {
        currentPlayerName = null;
        showGrid();
    });

    //#endregion
});

//#region Editor functions
    //#region UI Helpers
        function bindPlayerToUI() {
            //load player
            let p = players.find((x) => x.cardName === currentPlayerName) ?? { cardName: '' };
            $("#inCardName").val(p.cardName);
            $("#selHeight").val(p.height);
            $("#selSkillMoves").val(p.skillMoves);
            $("#selWeakFoot").val(p.weakFoot);
            $('#inOwned').prop('checked', p.owned);
            $('#rolePlusPlusPositions').val(p.roles).change();
            $("#inAcceleration").val(p.acceleration);
            $("#inSprintSpeed").val(p.sprintSpeed);
            $("#inAttackPositioning").val(p.attackPositioning);
            $("#inFinishing").val(p.finishing);
            $("#inShotPower").val(p.shotPower);
            $("#inLongShots").val(p.longShots);
            $("#inVolleys").val(p.volleys);
            $("#inVision").val(p.vision);
            $("#inCrossing").val(p.crossing);
            $("#inShortPass").val(p.shortPass);
            $("#inLongPass").val(p.longPass);
            $("#inCurve").val(p.curve);
            $("#inAgility").val(p.agility);
            $("#inBalance").val(p.balance);
            $("#inReactions").val(p.reactions);
            $("#inBallControl").val(p.ballControl);
            $("#inDribbling").val(p.dribbling);
            $("#inComposure").val(p.composure);
            $("#inInterceptions").val(p.interceptions);
            $("#inHeadingAccuracy").val(p.headingAccuracy);
            $("#inDefAware").val(p.defensiveAwareness);
            $("#inStandTackle").val(p.standTackle);
            $("#inSlideTackle").val(p.slideTackle);
            $("#inJumping").val(p.jumping);
            $("#inStamina").val(p.stamina);
            $("#inStrength").val(p.strength);
            $("#inAggression").val(p.aggression);
            $("#selFinesseShot").val(p.finesseShot);
            $("#selChipShot").val(p.chipShot);
            $("#selPowerShot").val(p.powerShot);
            $("#selPowerHeader").val(p.powerHeader);
            $("#selLowDrivenShot").val(p.lowDrivenShot);
            $("#selIncisivePass").val(p.incisivePass);
            $("#selPingedPass").val(p.pingedPass);
            $("#selLongBall").val(p.longBall);
            $("#selTikiTaka").val(p.tikiTaka);
            $("#selWhippedPass").val(p.whippedPass);
            $("#selJockey").val(p.jockey);
            $("#selBlock").val(p.block);
            $("#selIntercept").val(p.intercept);
            $("#selAnticipate").val(p.anticipate);
            $("#selSlideTackle").val(p.slideTacklePS);
            $("#selBruiser").val(p.bruiser);
            $("#selTechnical").val(p.technical);
            $("#selRapid").val(p.rapid);
            $("#selFirstTouch").val(p.firstTouch);
            $("#selTrickster").val(p.trickster);
            $("#selPressProven").val(p.pressProven);
            $("#selQuickStep").val(p.quickStep);
            $("#selRelentless").val(p.relentless);
            $("#selAcrobatic").val(p.acrobatic);
            $("#selAerial").val(p.aerial);
        }

        function clearPlayerUI() {
            $("#inCardName").val('');
            $("#selHeight").val('');
            $("#selSkillMoves").val('');
            $("#selWeakFoot").val('');
            $('#inOwned').prop('checked', true);
            $('#rolePlusPlusPositions').val([]).change();
            $("#inAcceleration").val('');
            $("#inSprintSpeed").val('');
            $("#inAttackPositioning").val('');
            $("#inFinishing").val('');
            $("#inShotPower").val('');
            $("#inLongShots").val('');
            $("#inVolleys").val('');
            $("#inVision").val('');
            $("#inCrossing").val('');
            $("#inShortPass").val('');
            $("#inLongPass").val('');
            $("#inCurve").val('');
            $("#inAgility").val('');
            $("#inBalance").val('');
            $("#inReactions").val('');
            $("#inBallControl").val('');
            $("#inDribbling").val('');
            $("#inComposure").val('');
            $("#inInterceptions").val('');
            $("#inHeadingAccuracy").val('');
            $("#inDefAware").val('');
            $("#inStandTackle").val('');
            $("#inSlideTackle").val('');
            $("#inJumping").val('');
            $("#inStamina").val('');
            $("#inStrength").val('');
            $("#inAggression").val('');
            $("#selFinesseShot").val('');
            $("#selChipShot").val('');
            $("#selPowerShot").val('');
            $("#selPowerHeader").val('');
            $("#selLowDrivenShot").val('');
            $("#selIncisivePass").val('');
            $("#selPingedPass").val('');
            $("#selLongBall").val('');
            $("#selTikiTaka").val('');
            $("#selWhippedPass").val('');
            $("#selJockey").val('');
            $("#selBlock").val('');
            $("#selIntercept").val('');
            $("#selAnticipate").val('');
            $("#selSlideTackle").val('');
            $("#selBruiser").val('');
            $("#selTechnical").val('');
            $("#selRapid").val('');
            $("#selFirstTouch").val('');
            $("#selTrickster").val('');
            $("#selPressProven").val('');
            $("#selQuickStep").val('');
            $("#selRelentless").val('');
            $("#selAcrobatic").val('');
            $("#selAerial").val('');
        }

        function showGrid() {
            $("#playersGrid").removeClass("d-none");
            $("#playerEditor").addClass("d-none");
        }

        function showPlayerEditor() {
            $("#playersGrid").addClass("d-none");
            $("#playerEditor").removeClass("d-none");
        }
    //#endregion


    //#region App object Helpers
        function createPlayerObject() {
            let p = {
                cardName: $("#inCardName").val()
                , height: parseInt($("#selHeight").val())
                , skillMoves: parseInt($("#selSkillMoves").val())
                , weakFoot: parseInt($("#selWeakFoot").val())
                , owned: $("#inOwned").is(":checked")
                , roles: $('#rolePlusPlusPositions').val()
                , acceleration: parseInt($("#inAcceleration").val())
                , sprintSpeed: parseInt($("#inSprintSpeed").val())
                , attackPositioning: parseInt($("#inAttackPositioning").val())
                , finishing: parseInt($("#inFinishing").val())
                , shotPower: parseInt($("#inShotPower").val())
                , longShots: parseInt($("#inLongShots").val())
                , volleys: parseInt($("#inVolleys").val())
                , vision: parseInt($("#inVision").val())
                , crossing: parseInt($("#inCrossing").val())
                , shortPass: parseInt($("#inShortPass").val())
                , longPass: parseInt($("#inLongPass").val())
                , curve: parseInt($("#inCurve").val())
                , agility: parseInt($("#inAgility").val())
                , balance: parseInt($("#inBalance").val())
                , reactions: parseInt($("#inReactions").val())
                , ballControl: parseInt($("#inBallControl").val())
                , dribbling: parseInt($("#inDribbling").val())
                , composure: parseInt($("#inComposure").val())
                , interceptions: parseInt($("#inInterceptions").val())
                , headingAccuracy: parseInt($("#inHeadingAccuracy").val())
                , defensiveAwareness: parseInt($("#inDefAware").val())
                , standTackle: parseInt($("#inStandTackle").val())
                , slideTackle: parseInt($("#inSlideTackle").val())
                , jumping: parseInt($("#inJumping").val())
                , stamina: parseInt($("#inStamina").val())
                , strength: parseInt($("#inStrength").val())
                , aggression: parseInt($("#inAggression").val())
                , finesseShot: parseInt($("#selFinesseShot").val())
                , chipShot: parseInt($("#selChipShot").val())
                , powerShot: parseInt($("#selPowerShot").val())
                , powerHeader: parseInt($("#selPowerHeader").val())
                , lowDrivenShot: parseInt($("#selLowDrivenShot").val())
                , incisivePass: parseInt($("#selIncisivePass").val())
                , pingedPass: parseInt($("#selPingedPass").val())
                , longBall: parseInt($("#selLongBall").val())
                , tikiTaka: parseInt($("#selTikiTaka").val())
                , whippedPass: parseInt($("#selWhippedPass").val())
                , jockey: parseInt($("#selJockey").val())
                , block: parseInt($("#selBlock").val())
                , intercept: parseInt($("#selIntercept").val())
                , anticipate: parseInt($("#selAnticipate").val())
                , slideTacklePS: parseInt($("#selSlideTackle").val())
                , bruiser: parseInt($("#selBruiser").val())
                , technical: parseInt($("#selTechnical").val())
                , rapid: parseInt($("#selRapid").val())
                , firstTouch: parseInt($("#selFirstTouch").val())
                , trickster: parseInt($("#selTrickster").val())
                , pressProven: parseInt($("#selPressProven").val())
                , quickStep: parseInt($("#selQuickStep").val())
                , relentless: parseInt($("#selRelentless").val())
                , acrobatic: parseInt($("#selAcrobatic").val())
                , aerial: parseInt($("#selAerial").val())
            };

            return p;
        }

        function savePlayer() {
            //create a new player object from UI
            let newPlayer = createPlayerObject();

            //remove a player with this name in the array for an update
            players = players.filter((p) => p.cardName !== newPlayer.cardName);

            //save this player
            players.push(newPlayer);

            //Save all the players back to storage
            window.localStorage.setItem(cPlayersKey, JSON.stringify(players));

            //load the players from localStorage
            //if no players create an empty array
            players = JSON.parse(localStorage.getItem(cPlayersKey)) ?? [];
        }
    //#endregion
//#endregion


//#region Grid functions
    function bindGrid() {
        $("#playersGrid").children().remove();

        //Create new player button and Owned filter
        $("#playersGrid").append(`<div class="row bg-secondary">
                                    <div id="divCardName_NewPlayer" class="col-2 bg-success">${cNewPlayerText}</div>
                                    <div class="col-2 bg-warning"><input type="checkbox" id="cbOwned" ${onlyOwned ? 'checked' : ''}><label for="cbOwned">Only Owned</label>                                    </div>
                                </div>`);
        $(`#divCardName_NewPlayer`).on("click", "", function () {
            currentPlayerName = null;
            bindPlayerToUI()
            showPlayerEditor();
        });

        $(`#cbOwned`).on("click", "", function () {
            onlyOwned = !onlyOwned;
            bindGrid();
        });

        //Header
        $("#playersGrid").append(`<div id="divPlayerHeaderRow" class="row">`);
        $("#divPlayerHeaderRow").append(`<div id="divColName" class="col-2 bg-primary">Name</div>`);
        $("#divPlayerHeaderRow").append(`<div class="col-1 bg-primary"></div>`);
        $("#divPlayerHeaderRow").append(`<div id="divColRating" class="col-1 bg-primary">Rating</div>`);
        $("#divPlayerHeaderRow").append(`<div id="divColStriker" class="col-1 bg-primary">Striker</div>`);
        $("#divPlayerHeaderRow").append(`<div id="divColWinger" class="col-1 bg-primary">Winger</div>`);
        $("#divPlayerHeaderRow").append(`<div id="divColCenterMid" class="col-1 bg-primary">Center Mid</div>`);
        $("#divPlayerHeaderRow").append(`<div id="divColWideMid" class="col-1 bg-primary">Wide Mid</div>`);
        $("#divPlayerHeaderRow").append(`<div id="divColCenterBack" class="col-1 bg-primary">Center Back</div>`);
        $("#divPlayerHeaderRow").append(`<div id="divColWideBack" class="col-1 bg-primary">Full Back</div>`);
        $("#divPlayerHeaderRow").append(`<div id="divColCAM" class="col-1 bg-primary">CAM</div>`);
        $("#divPlayerHeaderRow").append(`<div id="divColCDM" class="col-1 bg-primary">CDM</div>`);
        $("#divPlayerHeaderRow").append(`</div>`);

        bindColSortEvents();

        bindGridRows();
    }

    function bindGridRows(){
        players.forEach((p, index) => {
            if ($(`#cbOwned`).attr('checked') && !p.owned){return;}

            $("#playersGrid").append(`<div id="divPlayerRow_${index}" class="row ${altRowColor(index)}">`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}" class="col-2">${p.cardName}</div>`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}_Del" class="col-1" data-card-name="${p.cardName}"><img src="./img/delete.png"></img></div>`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}" class="col-1">${p.rating}</div>`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}_Str" class="col-1">${p.positions[0].rating} ${p.positions[0].chemStyle.substr(0,4)}</div>`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}_Wing" class="col-1">${p.positions[1].rating} ${p.positions[1].chemStyle.substr(0,4)}</div>`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}_CM" class="col-1">${p.positions[2].rating} ${p.positions[2].chemStyle.substr(0,4)}</div>`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}_WM" class="col-1">${p.positions[3].rating} ${p.positions[3].chemStyle.substr(0,4)}</div>`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}_CB" class="col-1">${p.positions[4].rating} ${p.positions[4].chemStyle.substr(0,4)}</div>`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}_FB" class="col-1">${p.positions[5].rating} ${p.positions[5].chemStyle.substr(0,4)}</div>`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}_CAM" class="col-1">${p.positions[6].rating}</div>`);
            $(`#divPlayerRow_${index}`).append(`<div id="divCardName_${p.cardName.replaceAll(' ', '_')}_CDM" class="col-1">${p.positions[7].rating}</div>`);
            $("#playersGrid").append(`</div>`);

            //bind click event to edit player
            $(`#divCardName_${p.cardName.replaceAll(' ', '_')}`).on("click", "", function () {
                currentPlayerName = $(this).text();
                bindPlayerToUI()
                showPlayerEditor();
            });

            //bind click event to Delete player
            $(`#divCardName_${p.cardName.replaceAll(' ', '_')}_Del`).on("click", "", function () {
                if (confirm(`Are you sure you want to delete ${$(this).attr('data-card-name')}?`)){
                    currentPlayerName = $(this).attr('data-card-name');
                    players = players.filter(item => item.cardName !== currentPlayerName);
                    bindGrid();
                }
            }); 
        });
    }

    function calcAllPlayerRatings() {
        let rolePlusPlus = 300;
        setRatingSystem();

        //iterate players
        players.forEach(function (player){
            player.positions = [];player.rating = 0;

            //iterate positions
            positions.forEach(function (pos) {
                let position = {};
                position.name = pos; position.points = 0; position.pointsMax = rolePlusPlus; position.chemStyle = '';

                //for each chem Style
                let maxPositionRating = 0;
                chemStyles.forEach(function(cs){
                    position.pointsMax = rolePlusPlus;
                    //Calculate  
                    const ratingKeys = Object.keys(ratingSystem);
                    ratingKeys.forEach(key => {
                        addAttributePoints(player, position, key, cs);
                    });

                    //If we have a new max rating for this position update it 
                    if(position.points > maxPositionRating){
                        maxPositionRating = position.points;
                        position.chemStyle = cs;
                    }
                    position.points = 0
                });
                position.points = maxPositionRating;

                //if they have a role ++ for this position add it
                if (player.roles && player.roles.includes(pos)){
                    position.points += rolePlusPlus;
                }

                //calc position rating
                position.rating = parseFloat(((position.points / position.pointsMax) * 100).toFixed(2));

                //add position to this player
                player.positions.push(position);
            });

            //ADD CAM and CDM positions for players with this role ++
            addCDM_CAM_Positions(player, rolePlusPlus);

            //Calc the players overall rating based on his best 3 positional ratings
            let bestThreePosRatings = player.positions.slice().sort((a, b) => b.rating - a.rating).slice(0,3);
            bestThreePosRatings.forEach((pos) =>{
                player.rating += pos.rating;
            });
            player.rating = (player.rating / 3).toFixed(2);
        });
    }

    function setRatingSystem() {
        ratingSystem = {
            "height":[null,cW,cCM,cFB,cSt,cCB],
            "skillMoves":[null,null,cCM,cSt,cWM,cW],
            "weakFoot":[cCB,cFB,cCM,cWM,cSt,cW],
            "acceleration":[cCB,cCM,cSt,cFB,cWM,cW],
            "sprintSpeed":[cCB,cCM,cSt,cFB,cWM,cW],
            "attackPositioning":[null,null,cWM,cCM,cW,cSt],
            "finishing":[null,null,cWM,cCM,cW,cSt],
            "shotPower":[cFB,cCB,cWM,cCM,cW,cSt],
            "longShots":[null,cCB,cW,cWM,cSt,cCM],
            "volleys":[null,cCB,cWM,cCM,cW,cSt],
            "vision":[null,null,cW,cSt,cWM,cCM],
            "crossing":[cSt,cCB,cCM,cW,cFB,cWM],
            "shortPass":[cFB,cCB,cW,cSt,cWM,cCM],
            "longPass":[cW,cFB,cSt,cCB,cWM,cCM],
            "curve":[cCB,cFB,cSt,cCM,cW,cWM],
            "agility":[null,cFB,cCM,cSt,cWM,cW],
            "balance":[cCB,cFB,cSt,cCM,cW,cWM],
            "reactions":[cFB,cWM,cCB,cW,cCM,cSt],
            "ballControl":[null,null,cWM,cCM,cW,cSt],
            "dribbling":[null,null,cCM,cSt,cWM,cW],
            "composure":[cFB,cCB,cW,cWM,cSt,cCM],
            "interceptions":[null,null,cWM,cFB,cCM,cCB],
            "headingAccuracy":[null,cFB,cW,cCM,cCB,cSt],
            "defensiveAwareness":[null,null,cSt,cCM,cFB,cCB],
            "standTackle":[null,null,cWM,cCM,cFB,cCB],
            "slideTackle":[null,cSt,cWM,cCM,cFB,cCB],
            "jumping":[cWM,cCM,cFB,cW,cCB,cSt],
            "stamina":[cSt,cW,cCB,cFB,cCM,cWM],
            "strength":[null,cW,cCM,cFB,cSt,cCB],
            "aggression":[cW,cWM,cSt,cFB,cCM,cCB],
            "finesseShot":[null,null,cCM,cWM,cSt,cW],
            "chipShot":[null,null,cWM,cCM,cW,cSt],
            "powerShot":[cFB,cCB,cWM,cW,cCM,cSt],
            "powerHeader":[null,cW,cCM,cFB,cCB,cSt],
            "lowDrivenShot":[null,null,cCM,cWM,cW,cSt],
            "incisivePass":[null,null,cW,cWM,cSt,cCM],
            "pingedPass":[null,cFB,cSt,cCB,cWM,cCM],
            "longBall":[null,null,cWM,cFB,cCM,cCB],
            "tikiTaka":[null,cW,cCB,cWM,cSt,cCM],
            "whippedPass":[cSt,cCM,cCB,cW,cWM,cFB],
            "jockey":[null,null,cWM,cCM,cFB,cCB],
            "block":[null,null,cWM,cCM,cFB,cCB],
            "intercept":[null,null,cWM,cCM,cFB,cCB],
            "anticipate":[null,null,cWM,cCM,cFB,cCB],
            "slideTacklePS":[null,null,cWM,cCM,cFB,cCB],
            "bruiser":[null,null,cSt,cCM,cFB,cCB],
            "technical":[null,null,cCM,cSt,cWM,cW],
            "rapid":[null,cCM,cSt,cFB,cWM,cW],
            "firstTouch":[null,null,cWM,cW,cCM,cSt],
            "trickster":[null,cFB,cCM,cSt,cWM,cW],
            "pressProven":[null,cW,cCB,cWM,cSt,cCM],
            "quickStep":[null,cCM,cFB,cSt,cWM,cW],
            "relentless":[cW,cSt,cFB,cCB,cWM,cCM],
            "acrobatic":[cFB,cCB,cWM,cCM,cW,cSt],
            "aerial":[null,null,cCM,cFB,cSt,cCB]
        }
    }

    function addAttributePoints(player, position, attribute, cs){
        let weight = ratingSystem[attribute].findIndex((x) => x === position.name) + 1;
        let playerAttribute = (parseInt(player[attribute]) || 0 )  + chemStyleModifier(cs, attribute);

        //make sure players attribute value does not exceed 99
        if (playerAttribute > 99){playerAttribute = 99;}

        position.pointsMax = position.pointsMax  + (99 * weight);
        position.points = position.points + (playerAttribute * weight);
    }

    function altRowColor(index){
        if (index % 2 == 1){return "bg-secondary text-white";}
    }

    function bindColSortEvents() {
        //bind sort events to column header
        $("#divColRating").on("click", "", function () {
            players.sort((a, b) => b.rating - a.rating);
            bindGrid();
        });
        $("#divColStriker").on("click", "", function () {
            players.sort((a, b) => b.positions[0].rating - a.positions[0].rating);
            bindGrid();
        });
        $("#divColWinger").on("click", "", function () {
            players.sort((a, b) => b.positions[1].rating - a.positions[1].rating);
            bindGrid();
        });
        $("#divColCenterMid").on("click", "", function () {
            players.sort((a, b) => b.positions[2].rating - a.positions[2].rating);
            bindGrid();
        });
        $("#divColWideMid").on("click", "", function () {
            players.sort((a, b) => b.positions[3].rating - a.positions[3].rating);
            bindGrid();
        });
        $("#divColCenterBack").on("click", "", function () {
            players.sort((a, b) => b.positions[4].rating - a.positions[4].rating);
            bindGrid();
        });
        $("#divColWideBack").on("click", "", function () {
            players.sort((a, b) => b.positions[5].rating - a.positions[5].rating);
            bindGrid();
        });
        $("#divColCAM").on("click", "", function () {
            players.sort((a, b) => b.positions[6].rating - a.positions[6].rating);
            bindGrid();
        });
        $("#divColCDM").on("click", "", function () {
            players.sort((a, b) => b.positions[7].rating - a.positions[7].rating);
            bindGrid();
        });
    }

    function chemStyleModifier(cs, attribute) {
        if (cs == 'Basic') {
            let attribs = ['sprintSpeed', 'attackPositioning','shotPower','volleys','vision','shortPass','longPass','curve','agility', 'ballControl','dribbling'
                            ,'defensiveAwareness','standTackle','slideTackle','jumping','strength'
            ];

            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Sniper'){
            let attribs = ['shotPower','volleys','aggression'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['longShots','strength'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['attackPositioning','finishing','shotPower','longShots','volleys','jumping','strength','aggression'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Finisher'){
            let attribs = ['attackPositioning','volleys','agility'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['finishing','dribbling'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['attackPositioning','finishing','shotPower','volleys','agility','balance','dribbling'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Deadeye'){
            let attribs = ['attackPositioning','finishing','vision'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['shotPower','shortPass'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['attackPositioning','finishing','shotPower','longShots','vision','shortPass','curve'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Marksman'){
            let attribs = ['finishing','longShots','ballControl','dribbling','jumping','strength'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['finishing','shotPower','longShots','reactions','ballControl','dribbling','jumping','strength'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Hawk'){
            let attribs = ['shotPower','longShots','jumping','aggression'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['acceleration','sprintSpeed','attackPositioning','finishing','shotPower','longShots','jumping','strength','aggression'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Artist'){
            let attribs = ['vision','crossing','dribbling'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['longPass','agility'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['vision','crossing','longPass','curve','agility','reactions','dribbling'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Architect'){
            let attribs = ['vision','curve','jumping'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['shortPass','strength'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['vision','shortPass','longPass','curve','jumping','strength','aggression'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Powerhouse'){
            let attribs = ['shortPass','longPass','interceptions'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['vision','standTackle'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['vision','crossing','shortPass','longPass','curve','interceptions','defensiveAwareness','standTackle'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Maestro'){
            let attribs = ['shotPower','longShots','longPass','reactions','dribbling'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['shotPower','longShots','volleys','vision','shortPass','longPass','reactions','dribbling'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Engine'){
            let attribs = ['crossing','curve','balance','dribbling'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['acceleration','sprintSpeed','vision','crossing','shortPass','longPass','curve','agility','balance','dribbling'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Sentinel'){
            let attribs = ['interceptions','defensiveAwareness','aggression'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['headingAccuracy','jumping'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['interceptions','headingAccuracy','defensiveAwareness','standTackle','slideTackle','jumping','strength','aggression'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Guardian'){
            let attribs = ['balance','defensiveAwareness','slideTackle'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['dribbling','standTackle'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['agility','balance','ballControl','dribbling','interceptions','defensiveAwareness','standTackle','slideTackle'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Gladiator'){
            let attribs = ['shotPower','interceptions','standTackle'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['finishing','slideTackle'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['finishing','shotPower','volleys','interceptions','headingAccuracy','defensiveAwareness','standTackle','slideTackle'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Backbone'){
            let attribs = ['vision','longPass','interceptions','standTackle','jumping','aggression'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['vision','longPass','interceptions','defensiveAwareness','standTackle','slideTackle','jumping','strength','aggression'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Anchor'){
            let attribs = ['standTackle','slideTackle','jumping','strength'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['acceleration','sprintSpeed','interceptions','headingAccuracy','defensiveAwareness','standTackle','slideTackle','jumping','strength','aggression'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Hunter'){
            let attribs = ['acceleration','sprintSpeed','finishing'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['volleys'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['acceleration','sprintSpeed','attackPositioning','finishing','shotPower','volleys'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Catalyst'){
            let attribs = ['acceleration','sprintSpeed','longPass'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['crossing'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['acceleration','sprintSpeed','crossing','shortPass','longPass','curve'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }
        else if(cs == 'Shadow'){
            let attribs = ['acceleration','sprintSpeed','interceptions','standTackle'];
            if (attribs.includes(attribute)) {
                return 8;
            }
            attribs = ['slideTackle'];
            if (attribs.includes(attribute)) {
                return 12;
            }
            attribs = ['acceleration','sprintSpeed','interceptions','headingAccuracy','defensiveAwareness','standTackle','slideTackle'];
            if (attribs.includes(attribute)) {
                return 4;
            }
        }

        return 0;
    }

    //#region GRID HELPER FUNCTIONS
        function addCDM_CAM_Positions(player, rolePlusPlus){
            //ADD CAM position for players with this role ++
            if (player.roles && player.roles.includes('CAM')){
                let points = player.positions[2].points + player.positions[0].points + rolePlusPlus;
                let maxPoints = player.positions[2].pointsMax + player.positions[0].pointsMax + rolePlusPlus;
                let camRating = parseFloat(((points / maxPoints) * 100).toFixed(2));
                let position = {name : 'CAM', rating : camRating};
                player.positions.push(position);
            }
            else{
                let position = {name : 'CAM', rating : 0};
                player.positions.push(position);
            }
            
            //ADD CDM position for players with this role ++
            if (player.roles && player.roles.includes('CDM')){
                let points = player.positions[2].points + player.positions[4].points + rolePlusPlus;
                let maxPoints = player.positions[2].pointsMax + player.positions[4].pointsMax + rolePlusPlus;
                let cdmRating = parseFloat(((points / maxPoints) * 100).toFixed(2));
                let position = {name : 'CDM', rating : cdmRating};
                player.positions.push(position);
            }
            else{
                let position = {name : 'CDM', rating : 0};
                player.positions.push(position);
            }
        }
    //#endregion
//#endregion