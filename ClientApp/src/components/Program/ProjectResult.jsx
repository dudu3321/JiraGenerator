import React, { useEffect, useState } from "react";
import { ProjectTable } from './ProjectTable';
import { ProjectText } from './ProjectText';

export const ProjectResult = (props) => {
    const NUMBER_TO_STRING = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

    let result = [];
    props.projects.forEach(item => {
        let commentSTableRow = '';
        for (let i = item.commitFrom; i <= item.commitTo; i++) {
            if (i === 0) continue;
            if (i > 9) break;
            commentSTableRow += `備註${NUMBER_TO_STRING[i]}`;
            if (i !== item.commitTo && i < 9) {
                commentSTableRow += '、';
            }
        }

        result.push({
            name: item.project.name,
            path: item.project.path,
            comment: commentSTableRow,
            branch: (item.branchDomain === "" ? "" : `${item.branchDomain}-`) + item.branch
        });
    });

    return <div>
        <ProjectTable result={result} hendleDelete={props.hendleDelete}></ProjectTable>
        <ProjectText result={result}></ProjectText>
    </div>;
}
