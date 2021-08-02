/**
 * Created by joshwolfman on 5/6/19.
 */
function main(){
    setInterval(update,100);
}
function update(){
    var PL=parseFloat(document.getElementById("PL").value);
    var number=parseFloat(document.getElementById("size").value);
    var CR=[0,0];
    /*
     NPC's Challenge Rank: NPC's Power Level
     Challenge Rank 1: Party's PL -4 or lower
     Challenge Rank 2: Party's PL -2 or -3
     Challenge Rank 3: Party's PL -1
     Challenge Rank 4: Party's PL
     Challenge Rank 5-6: Party's PL + 1
     Challenge Rank 7-9: Party's PL + 2
     Challenge Rank 10-13: Party's PL + 3
     Challenge Rank 14-19: Party's PL + 4
     Challenge Rank 20+: Party's PL + 5
     */
    if(document.getElementsByClassName("NPC").length>0) {
        for (var c=0;c<document.getElementsByClassName("NPC").length;c++) {
            var NPC=document.getElementsByClassName("NPC")[c];
            var ePL = parseFloat(NPC.childNodes[3].value);
            if(NPC.childNodes[7].checked){//check rapid-fire
                ePL+=2;
            }
            if(NPC.childNodes[9].checked){//check ally
                CR[0]*=-1;
                CR[1]*=-1;
            }
            for(var i=0;i<NPC.childNodes[5].value;i++) {
                if (ePL == PL - 4) {
                    CR[0] += 1;
                    CR[1] += 1;
                } else if (ePL <= PL - 2) {
                    CR[0] += 2;
                    CR[1] += 2;
                } else if (ePL == PL - 1) {
                    CR[0] += 3;
                    CR[1] += 3;
                } else if (ePL == PL) {
                    CR[0] += 4;
                    CR[1] += 4;
                } else if (ePL == PL + 1) {
                    CR[0] += 5;
                    CR[1] += 6;
                } else if (ePL == PL + 2) {
                    CR[0] += 7;
                    CR[1] += 9;
                } else if (ePL == PL + 3) {
                    CR[0] += 10;
                    CR[1] += 13;
                } else if (ePL == PL + 4) {
                    CR[0] += 14;
                    CR[1] += 19;
                } else{
                    CR[0] += Math.ceil(3.85056*Math.E**(.319568*(ePL-PL)));
                    CR[1] += Math.ceil(4.24811*Math.E**(.373671*(ePL-PL)));
                }
            }
            if(NPC.childNodes[9].checked){//check ally
                CR[0]*=-1;
                CR[1]*=-1;
            }
        }
    }
    /*
     Party PL-8= 16 minions for 1 challenge rank
     Party PL-7= 12 minions for 1 challenge rank
     Party PL-6= 8 minions for 1 challenge rank
     Party PL-5= 6 minions for 1 challenge Rank
     Party PL-4= 4 minions for 1 challenge rank
     Party PL-3= 3 minions for 1 challenge rank
     Party PL-2= 2 minions for 1 challenge rank
     Party PL-1 to Party PL= 1 minion for 1 challenge rank
     */
    if(document.getElementsByClassName("minion").length) {
        for (var c=0;c<document.getElementsByClassName("minion").length;c++) {
            var minion=document.getElementsByClassName("minion")[c];
            var ePL = parseFloat(minion.childNodes[3].value);
            var num=parseFloat(minion.childNodes[5].value)*(parseFloat(minion.childNodes[7].value)+1);
            if(minion.childNodes[9].checked){//check ally
                CR[0]*=-1;
                CR[1]*=-1;
            }
            if(ePL<=PL-8){
                CR[0]+=num/16;
                CR[1]+=num/16;
            }else if(ePL<=PL-7){
                CR[0]+=num/12;
                CR[1]+=num/12;
            }else if(ePL<=PL-6){
                CR[0]+=num/8;
                CR[1]+=num/8;
            }else if(ePL<=PL-5){
                CR[0]+=num/6;
                CR[1]+=num/6;
            }else if(ePL<=PL-4){
                CR[0]+=num/4;
                CR[1]+=num/4;
            }else if(ePL<=PL-3){
                CR[0]+=num/3;
                CR[1]+=num/3;
            }else if(ePL<=PL-2){
                CR[0]+=num/2;
                CR[1]+=num/2;
            }else if(ePL<=PL){
                CR[0]+=num;
                CR[1]+=num;
            }else{
                CR[0]+=Math.ceil(num/(1.03683*Math.E**(-.344073*(ePL-PL))));
                CR[1]+=Math.ceil(num/(1.03683*Math.E**(-.344073*(ePL-PL))));
            }
            if(minion.childNodes[9].checked){//check ally
                CR[0]*=-1;
                CR[1]*=-1;
            }
        }
    }
    CR[0]=Math.ceil(CR[0]);
    CR[1]=Math.ceil(CR[1]);
    var p= document.createElement("P");
    var diff=document.createElement("P");
    if(CR[0]==CR[1]){
        p.innerHTML=CR[0];
        diff.innerHTML=calc(CR[0],number);
    }else{
        p.innerHTML=CR[0]+"-"+CR[1];
        diff.innerHTML=calc(CR[0],number)+"-"+calc(CR[1],number);
    }
    while(document.getElementById("CR").childElementCount>1) {
        document.getElementById("CR").removeChild(document.getElementById("CR").childNodes[2]);
    }
    document.getElementById("CR").appendChild(p);
    while(document.getElementById("diff").childElementCount>1){
        document.getElementById("diff").removeChild(document.getElementById("diff").childNodes[2]);
    }
    document.getElementById("diff").appendChild(diff);
}
function add(type){
    var NPC=document.createElement("DIV");
    NPC.className=type;
    var name=document.createElement("P");
    name.innerHTML="Name:";
    var nameBox=document.createElement("INPUT");
    nameBox.type="text";
    var PL=document.createElement("P");
    PL.innerHTML=" PL:";
    var PLBox=document.createElement("INPUT");
    PLBox.type="number";
    PLBox.className="PL";
    PLBox.min=1;
    PLBox.value=1;
    PLBox.onchange=update();
    var number=document.createElement("P");
    number.innerHTML=" Number:";
    var numberBox=document.createElement("INPUT");
    numberBox.type="number";
    numberBox.className="number";
    numberBox.min=1;
    numberBox.value=1;
    numberBox.onchange=update();
    var rapid=document.createElement("P");
    rapid.innerHTML=" Rapid-Fire:";
    var rapidBox=document.createElement("INPUT");
    rapidBox.type="checkbox";
    rapidBox.className="rapid";
    rapidBox.onchange=update();
    var tier=document.createElement("P");
    tier.innerHTML="Tier:";
    var tierBox=document.createElement("SELECT");
    tierBox.onchange=update();
    var tierBruise=document.createElement("OPTION");
    tierBruise.value=0;
    tierBruise.innerHTML="Bruise";
    tierBox.appendChild(tierBruise);
    var tierDaze=document.createElement("OPTION");
    tierDaze.value=1;
    tierDaze.innerHTML="Daze";
    tierBox.appendChild(tierDaze);
    var tierStag=document.createElement("OPTION");
    tierStag.value=2;
    tierStag.innerHTML="Stagger";
    tierBox.appendChild(tierStag);
    var ally=document.createElement("P");
    ally.innerHTML="Ally:";
    var allyBox=document.createElement("INPUT");
    allyBox.type="checkbox";
    allyBox.className="ally";
    allyBox.onchange=update();
    var remove=document.createElement("BUTTON");
    remove.innerHTML="Remove";
    NPC.appendChild(name);
    NPC.appendChild(nameBox);
    NPC.appendChild(PL);
    NPC.appendChild(PLBox);
    NPC.appendChild(number);
    NPC.appendChild(numberBox);
    if(type=="NPC") {
        NPC.appendChild(rapid);
        NPC.appendChild(rapidBox);
    }else{
        NPC.appendChild(tier);
        NPC.appendChild(tierBox);
    }
    NPC.appendChild(ally);
    NPC.appendChild(allyBox);
    NPC.appendChild(remove);
    document.getElementById(type).appendChild(NPC);
    remove.setAttribute("onclick","this.parentElement.parentElement.removeChild(this.parentElement)");
}
function toggleTutorial(target){
    if(target.childElementCount>0){
        target.removeChild(target.childNodes[1]);
        target.text="How to use this calculator";
    }else{
        var p=document.createElement("P");
        p.id="popup";
        p.innerHTML="First set the PL of the party and the number of players then use the buttons to add or remove" +
            " NPCs and minions and set their numbers and PLs. The calculator will calculate the CR and show the" +
            " danger ranking of the encounter, the danger ranking being more important to play than the challenge" +
            " ranking.<br><br>"+
            "This calculator deviates from the danger ranking scale set out in the original formula. We have found" +
            " that it doesn't actually hold up well to play with characters who have defenses and offenses at cap" +
            " for PL, and that it is very common for new players and GMs to make the mistake of not capping those on" +
            " PCs. We can only assume that the ranking system was made for such groups. That being said, we do" +
            " include the original scale in brackets following the numerical danger ranking. Furthermore, we have" +
            " explanations based on how we've found the rankings to translate in play, as well as extending the" +
            " formula in both directions for NPCs and minions.<br><br>"+
            "No Danger: There is no possible way that the PCs could be seriously threatened.<br>"+
            "Minimal Danger: The PCs have almost no chance of being defeated.<br>"+
            "Modest Danger: The PCs stand to suffer some injuries if they're not careful.<br>"+
            "Significant Danger: The PCs are likely to win the fight, but it will require smart play to come out on" +
            " top.<br>"+
            "Serious Danger: The PCs are going up against a real threat and could just as easily win as they could" +
            " lose, and will need to play smart to win.<br>"
            "Severe Danger: The PCs are going to be outmatched, and without very clever gameplay and teamwork," +
            " they're more likely than not going to lose.<br>"
            "Overwhelming Danger: The PCs are very likely to lose the encounter, and only tremendous luck or playing" +
            " at the top of their game can see them through.";
        target.appendChild(p);
    }
}
function calc(CR,num){
    var DR=Math.floor(CR/num);
    switch(DR){
        case 0:
        case 1:
        case 2:
            return " No Danger ("+DR+")";
        case 3:
            return " Minimal Danger ("+DR+")";
        case 4:
            return " Modest Danger ("+DR+")";
        case 5:
            return " Significant Danger ("+DR+")";
        case 6:
            return " Serious Danger ("+DR+")";
        case 7:
            return " Severe Danger ("+DR+")";
        case 8:
            return " Overwhelming Danger ("+DR+")";
        default:
            return " Exceeds danger ranks ("+DR+")";
    }
}