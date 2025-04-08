import React from "react";

export default function FormattedDate(getDate) {
    const date = new Date(getDate.getDate);
    const formattedDate = date.toLocaleString("en-IN");
    return formattedDate;
}
