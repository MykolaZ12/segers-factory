import React, {useEffect, useState} from "react";
import {CategoryBlock} from "./CategoryBlock";
import {ItemFilterBlock} from "./ItemFilterBlock";
import {categoryAPI} from "../../../api/CategoryAPI";

export const SlidingSidebarFilter = ({
                                         toggleFilter,
                                         onClickToggle,
                                         categories,
                                         setUniversalQueryString,
                                         onHandleChangeCheckboxFilter,
                                         setQueryString
                                     }) => {
    const [filters, setFilters] = useState({})

    const setFilterCategory = async (categoryId) => {
        const response = await categoryAPI.getCategoryFilters(categoryId)
        setFilters(response.data.filters)
    }


    return (
        <>
            <div
                className={toggleFilter ? 'filter__wrap filter__menu__on' : 'filter__wrap'}>
                <div className="filter__cart">
                    <div className="filter__cart__inner">
                        <div className="filter__menu__close__btn">
                            <a onClick={onClickToggle} href="/shop#">
                                <i className="zmdi zmdi-close"></i></a>
                        </div>
                        <div className="filter__content">
                            <div className="fiter__content__inner">
                                <CategoryBlock categories={categories}
                                               setFilterCategory={setFilterCategory}
                                               setQueryString={setQueryString}
                                               setUniversalQueryString={setUniversalQueryString}
                                />
                                {Object.keys(filters).map((keyName, index) =>
                                    <ItemFilterBlock
                                        key={index}
                                        filterName={keyName}
                                        filterValues={filters[keyName]}
                                        onHandleChangeCheckboxFilter={onHandleChangeCheckboxFilter}/>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}