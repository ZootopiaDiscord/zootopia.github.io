$(document).ready(function () {
    generateRules();
    generateMods();
    generateChannels();
    generateRoles();
    generateBots();
    generateMinorBots();
});

function generateRules() {
    $.get('sections/rules.txt', function (data) {
        let rawRules = data.split('\n');
        let rules = "";
        for (let index = 0; index < rawRules.length; index++) {
            if (rawRules[index].length < 2) {
                rules += "</ol>"
            }
            else if (rawRules[index].substring(0, 1) == ">") {
                rules += "<li>" + rawRules[index].substring(1) + "</li><ol>";
            }
            else {
                let rule = rawRules[index];
                rule = rule.replace(/<channel>/g, '<span class="channel">')
                    .replace(/<command>/g, '<span class="command">')
                    .replace(/<\/>/g, '</span>');
                rules += "<li>" + rule + "</li>"
            }
        }
        rules += "</ol>"
        $("#ul-rules").html(rules);
    });
    $.get('sections/rules_other.txt', function (data) {
        let rulesOther = "<li>" + data + "</li>";
        $("#ul-other").html(rulesOther);
    });
    $.get('sections/rules_zpd.txt', function (data) {
        let rawRulesZPD = data.split('\n');
        let rulesZPD = "";
        for (let index = 0; index < rawRulesZPD.length; index++) {
            if (rawRulesZPD[index].length < 2) {
                rulesZPD += "</ol>"
            } else if (rawRulesZPD[index].substring(0, 1) == ">") {
                rulesZPD += "<li>" + rawRulesZPD[index].substring(1) + "</li><ol>";
            } else {
                rulesZPD += "<li>" + rawRulesZPD[index] + "</li>"
            }
        }
        $("#ul-zpd").html(rulesZPD);
    });
}

function generateChannels() {
    let firstCategory = true;
    let serverID = 164188105031680000;

    $.get('sections/channels.txt', function (data) {
        let rawChannels = data.split('\n');
        let channels = "";

        for (let index = 0; index < rawChannels.length; index++) {
            let categoryClasses = rawChannels[index + 1];

            switch (rawChannels[index].substring(0, 1)) {
                case ">":
                    if (firstCategory == false) {
                        channels += '</ul>'
                    } else {
                        firstCategory = false;
                    }
                    channels += '<ul';
                    if (rawChannels[index].substring(1, 2) == ">") {
                        categoryClasses += ' channelCategory-hide';
                        categoryClasses += rawChannels[index].substring(2);
                    }
                    if (categoryClasses == "everyone") {
                        channels += '>';
                    } else {
                        channels += ' class="'
                        channels += categoryClasses;
                        channels += '">'
                    }
                    channels += '<li>';
                    if (rawChannels[index].substring(1, 2) == ">") {
                        channels += rawChannels[index].substring(2);
                    } else {
                        channels += rawChannels[index].substring(1);
                    }
                    channels += '</li>';
                    break;
                case "#":
                    if (categoryClasses == "everyone") {
                        channels += '<li>'
                    } else {
                        channels += '<li class="';
                        channels += categoryClasses;
                        channels += '">'
                    }
                    channels += '<a href="https://discordapp.com/channels/';
                    channels += serverID;
                    channels += '/';
                    channels += rawChannels[index + 3];
                    channels += '">';
                    channels += rawChannels[index].substring(1);
                    channels += '</a></li>';
                    if (categoryClasses == "everyone") {
                        channels += '<li>'
                    } else {
                        channels += '<li class="';
                        channels += categoryClasses;
                        channels += '">'
                    }
                    channels += rawChannels[index + 2];
                    channels += '</li>'
                    break;
                default:
                    break;
            }
        }
        channels += '</ul>';
        $(".channels").children("article").append(channels);
    });
}

function generateRoles() {
    $.get('sections/roles.txt', function (data) {
        let rawRoles = data.split('\n');
        let roles = "";
        for (let index = 0; index < rawRoles.length; index += 2) {
            let roleID = rawRoles[index];
            roleID = roleID.replace(/\s+/g, "")
                .replace(/\//g, "")
                .toLowerCase();
            let roleDescription = rawRoles[index + 1];
            roleDescription = roleDescription.replace(/<channel>/g, '<span class="channel">')
                .replace(/<command>/g, '<span class="command">')
                .replace(/<\/>/g, '</span>');
            roles += '<div class="role" id="role-';
            roles += roleID;
            roles += '"><div class="role-top">'
            roles += rawRoles[index];
            roles += '</div><div class="role-bottom">';
            roles += roleDescription;
            roles += '</div></div>';
        }
        $('#roles-container').html(roles);

        setTimeout(() => {
            $('#roles-container').masonry({
                itemSelector: '.role',
                fitWidth: true,
                transitionDuration: 0
            });
        }, 2000);
    });
}

function generateBots() {
    $.get('sections/bots.txt', function (data) {
        let rawBots = data.split('\n');
        let bots = "";

        for (let index = 0; index < rawBots.length; index += 4) {
            bots += '<div class="bot"><div class="bot-head"><img src="img/bots/';
            bots += rawBots[index];
            bots += '.jpg">';
            bots += rawBots[index];
            if (rawBots[index+1].length > 1){
                bots += '<span class="bot-original-name">'
                bots += rawBots[index+1];
                bots += '</span>';
            }
            bots += '</div><div class="bot-foot">PURPOSE<div class="bot-roles">'
            let roles = rawBots[index+2].split(', ');
            for (let index2 = 0; index2 < roles.length; index2++) {
                bots += '<div class="bot-role">';
                bots += roles[index2];
                bots += '</div>';
            }
            bots += '</div><div class="bot-description">';
            bots += rawBots[index+3];
            bots += '</div></div></div>';
        }

        $(".bots").children("article").children("#bots-major").html(bots);
    });
}

function generateMinorBots() {
    $.get('sections/bots_minor.txt', function (data) {
        let rawBots = data.split('\n');
        let bots = "";

        for (let index = 0; index < rawBots.length; index += 2) {
            bots += '<div class="bot"><img src="img/bots/';
            bots += rawBots[index];
            bots += '.jpg"><div class="bot-minor-info"><span class="bot-minor-name">'
            bots += rawBots[index];
            bots += '</div><div class="bot-minor-description">';
            bots += rawBots[index+1];
            bots += '</div></div>';
        }

        $(".bots").children("article").children("#bots-minor").html(bots);
    });
}

function generateMods() {
    $.get('sections/mods.txt', function (data) {
        let rawMods = data.split('\n');
        let mods = "";
        for (let index = 0; index < rawMods.length; index += 2) {
            mods += '<div class="mod"><a href="http://discordapp.com/users/';
            mods += rawMods[index + 1];
            mods += '"><img src="img/avatars/';
            mods += rawMods[index + 1];
            mods += '.jpg" alt="';
            mods += rawMods[index];
            mods += '"><h2>';
            mods += rawMods[index];
            mods += '</h2></a></div>'
        }
        $(".mods").children("article").children("#mods-wrapper").html(mods);
    });
}