import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../constants';

import { Button } from '@material-ui/core';
import styled from 'styled-components';

import { ExamTable, ExamList} from '../pages';

const LinksGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr [col-start]);
  margin-bottom: 1em;
  min-height: 30px;
  padding: 1em;
  width: 100%;
`;

const LinkGridWrapper = styled.div``;

const isCurrentPage = linkPathname => {
  return window.location.pathname === linkPathname;
};

const linkTextColor = linkPathname => {
  return isCurrentPage(linkPathname) ? '#FFFFFF' : 'rgba(255,255,255,.75)';
};

const itemsPageVariants = [
  {

    name: 'Exams',
    toPathname: routes.EXAMS,
   pageComponent: ExamList,
    /*name: 'Items',
    toPathname: routes.ITEMS,
    pageComponent: ItemsPlain,*/




  },
  {
    name: 'Exams (using react-table-v6)',
    toPathname: `${routes.EXAMS}/react-table-v6`,
    pageComponent: ExamsTable,
  },
  /*{
    name: 'Items (with only styled-components)',
    toPathname: `${routes.ITEMS}/items-plain`,
    pageComponent: ItemsPlain,
  },*/
  
];

class Exams extends Component {
  render() {
    // TODO: would be better to dynamically create the routes based on page variations
    const examsPages = (
      <Switch>
        <Route exact path={routes.EXAMS} component={ExamList} />
        <Route exact path={`${routes.EXAMS}/react-table-v6`} component={ExamTable} />
        <Route exact path={`${routes.EXAMS}/items-plain`} component={ItemsPlain} />
      </Switch>
    );

    return (
      <>
        <LinksGridContainer>
          {itemsPageVariants.map((itemsPageVariant, i) => (
            <LinkGridWrapper
              key={itemsPageVariant.name}
              style={{ gridColumn: `${(i + 2) * 2 - 1} / span 2` }}>
              <Button className="bg-dark" variant="contained">
                <Link
                  style={{ color: linkTextColor(itemsPageVariant.toPathname) }}
                  to={itemsPageVariant.toPathname}>
                  {itemsPageVariant.name}
                </Link>
              </Button>
            </LinkGridWrapper>
          ))}
        </LinksGridContainer>
        {examsPages}
      </>
    );
  }
}

export default Exams;
