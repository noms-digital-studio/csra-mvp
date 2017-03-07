import React from 'react';

const Static = ({title, description}) => {
    return (
        <aside className="govuk-related-items" role="complementary">
            <h3 className="heading-medium u-margin-top-default" id="subsection-title">{title}</h3>
            <p>{description}</p>
        </aside>
    )
}

export default Static;