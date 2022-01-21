import React from "react";
import { ProjectTable } from './ProjectTable';
import { ProjectText } from './ProjectText';

export const ProjectResult = (props) => {
    const HEADER = "異動程式: \n||Project Name||Project Path||Branch Name||Version||Note||\n";
    let result = [];
    let resltStr = '';
    let commentMain = '\n';
    let todayDate = new Date();
    let version = `v${todayDate.getFullYear()}.${ (todayDate.getMonth() + 1).toString().padStart(2,'0') }.${todayDate.getDate().toString().padStart(2,'0')}.01`;

    if (props.projects.length > 0) {
        resltStr += HEADER;
    }

    props.projects.forEach(item => {
        let commentSTableRow = '';
        let branch = (item.withFeature ? "feature/" : "") + (item.branchDomain === "" ? "" : `${item.branchDomain}-`) + item.branch;
        let commitFromVal = item.commitFrom;
        let commitToVal = item.commitFrom > item.commitTo ? item.commitFrom : item.commitTo;
        for (let i = commitFromVal; i <= commitToVal; i++) {
            if (i == 0) continue;
            if (i > 9) break;
            commentSTableRow += `備註${i}`;
            
            if (i.toString() !== commitToVal && i < 9) {
                commentSTableRow += '、';
            }
        }
        
        resltStr += `|${item.project.name}|${item.project.path}|${branch === '' ? ' ' : branch}|${version}|${commentSTableRow === '' ? ' ' : commentSTableRow}|\n`
        result.push({
            name: item.project.name,
            path: item.project.path,
            comment: commentSTableRow,
            branch: branch,
        });
    });

    for(let i= 0; i < props.openComment.length; i++) {
        if (props.openComment[i] == true){
            commentMain += `備註${i + 1}:\n`;
        }
    };

    resltStr += commentMain;

    return <div>
        <ProjectTable result={result} hendleDelete={props.hendleDelete}></ProjectTable>
        <ProjectText result={resltStr}></ProjectText>
    </div>;
}
