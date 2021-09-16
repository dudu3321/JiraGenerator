import React from "react";
import { ProjectTable } from './ProjectTable';
import { ProjectText } from './ProjectText';

export const ProjectResult = (props) => {
    const NUMBER_TO_STRING = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const HEADER = "||Project Name||Project Path||Branch Name||Version||Note||\n";
    let result = [];
    let resltStr = '';
    let commentMain = '\n';
    if (props.projects.length > 0) {
        resltStr += HEADER;
    }

    props.projects.forEach(item => {
        let commentSTableRow = '';
        let branch = (item.withFeature ? "feature/" : "") + (item.branchDomain === "" ? "" : `${item.branchDomain}-`) + item.branch;
        for (let i = item.commitFrom; i <= item.commitTo; i++) {
            if (i === 0) continue;
            if (i > 9) break;
            commentSTableRow += `備註${NUMBER_TO_STRING[i]}`;
            
            if (i.toString() !== item.commitTo && i < 9) {
                commentSTableRow += '、';
            }
        }
        
        resltStr += `|${item.project.name}|${item.project.path}|${branch === '' ? ' ' : branch}| |${commentSTableRow === '' ? ' ' : commentSTableRow}|\n`
        result.push({
            name: item.project.name,
            path: item.project.path,
            comment: commentSTableRow,
            branch: branch,
        });
    });

    for(let i= 0; i < props.openComment.length; i++) {
        if (props.openComment[i] == true){
            commentMain += `備註${NUMBER_TO_STRING[i + 1]}:\n`;
        }
    };

    resltStr += commentMain;

    return <div>
        <ProjectTable result={result} hendleDelete={props.hendleDelete}></ProjectTable>
        <ProjectText result={resltStr}></ProjectText>
    </div>;
}
