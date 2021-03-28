import React, {useCallback, useEffect, useState} from 'react';
import {ProductCard} from "./ProductCard/ProductCard";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";
import {productAPI} from "../../api/ProductAPI";
import {PacmanLoader} from "react-spinners";
import {SlidingSidebarFilter} from "./SlidingSidebarFilter/SlidingSidebarFilter";
import {categoryAPI} from "../../api/CategoryAPI";
import {SidebarFilter} from "./SidebarFilter/SidebarFilter";
import {useHistory} from "react-router";


export function Shop() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [toggleFilter, setToggleFilter] = useState(false)
    const [queryParams, setQueryString] = useState({})
    const [universalQueryParams, setUniversalQueryString] = useState({})
    const [optionsSort, setOptionsSort] = useState(["Low-price", "High-price"])

    const onHandleChangeOptionsSort = e => {
        if (e.currentTarget.value !== "default") {
            const value = e.currentTarget.value
            setUniversalQueryString(prev => ({...prev, ordering: value}))
        } else {
            delete universalQueryParams["ordering"]
        }
    }

    const buildQueryUrl = useCallback((parameters) => {
        let qs = "";
        let queryParams = ""
        for (let key in parameters) {
            let value = parameters[key];
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "/";
        }
        if (qs.length > 0) {
            qs = qs.substring(0, qs.length - 1); //chop off last "&"
            queryParams = "&attr=" + qs;
        }
        return queryParams;
    }, [])

    const [options, setOptions] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await productAPI.getProducts();
            console.log(response)
            setProducts(response.products)
            setOptions(response.options)
            setLoading(false)

            const categoryList = await categoryAPI.getCategories();
            setCategories(categoryList)
        })()
    }, [])

    const productFilter = useCallback(async (queryParameters) => {
        setLoading(true)
        const response = await productAPI.getProductByFilters(queryParameters)
        setProducts(response.data.products)
        setOptions(response.data.options)
        setLoading(false)
    }, [])

    const onClickToggle = () => {
        setToggleFilter(!toggleFilter)
    }

    ///////////

    const onHandleChangeCheckboxFilter = async e => {
        const filterName = e.currentTarget.name
        const filterValue = e.currentTarget.value
        const isChecked = e.currentTarget.checked
        if (queryParams[filterName] && isChecked) {
            setQueryString(prev => ({
                ...prev,
                [filterName]: [...prev[filterName], filterValue]
            }))
        } else if (isChecked) {
            setQueryString(prev => ({...prev, [filterName]: [filterValue]}))
        } else {
            const newFilterListValue = queryParams[filterName].filter(item => item !== filterValue)
            if (newFilterListValue.length > 0) {
                setQueryString(prev => ({...prev, [filterName]: newFilterListValue}))
            } else {
                delete queryParams[filterName]
                setQueryString(prev => ({
                    ...prev,
                    ...queryParams
                }))
            }
        }
    }

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
    const history = useHistory()
    useEffect(() => {
        if (!isEmpty(universalQueryParams) || !isEmpty(queryParams)) {
            const universalParams = new URLSearchParams(universalQueryParams);
            productFilter(universalParams.toString() + buildQueryUrl(queryParams))
            history.push("?" + universalParams.toString() + buildQueryUrl(queryParams).toString())
        }
    }, [queryParams, universalQueryParams, productFilter, buildQueryUrl])

    return (
        <>
            <Breadcrumb namePage={"Shop"}/>
            <SlidingSidebarFilter toggleFilter={toggleFilter}
                                  onClickToggle={onClickToggle}
                                  categories={categories}
                                  setUniversalQueryString={setUniversalQueryString}
                                  onHandleChangeCheckboxFilter={onHandleChangeCheckboxFilter}
                                  options={options}
            />

            <section className="htc__shop__sidebar bg__white ptb--120">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">

                            <SidebarFilter setUniversalQueryString={setUniversalQueryString}
                                           categories={categories}
                                           options={options}
                                           onHandleChangeCheckboxFilter={onHandleChangeCheckboxFilter}/>

                        </div>
                        <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 smt-30">
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                    <div className="producy__view__container">
                                        <div className="filter__box visible-xs visible-sm">
                                            <a onClick={onClickToggle} className="filter__menu"
                                               href="/shop#"><i className="fa fa-filter"></i> filter</a>
                                        </div>
                                        <div className="product__list__option">
                                            <div className="order-single-btn">
                                                <select className="select-color selectpicker"
                                                        onChange={onHandleChangeOptionsSort}>
                                                    <option value={"default"}> Sort by ---</option>
                                                    <option value={"price"}> Low-price</option>
                                                    <option value={"-price"}> High-price
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="shp__pro__show">
                                                <span>Showing 1 - 4 of 25 results</span>
                                            </div>
                                        </div>
                                        <ul className="view__mode" role="tablist">
                                            <li role="presentation" className="grid-view active"><a
                                                href="/#grid-view" role="tab" data-toggle="tab"><i
                                                className="zmdi zmdi-grid"></i></a></li>
                                            <li role="presentation" className="list-view"><a
                                                href="/#list-view" role="tab" data-toggle="tab"><i
                                                className="zmdi zmdi-view-list"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="shop__grid__view__wrap another-product-style">
                                    <div role="tabpanel" id="grid-view"
                                         className="single-grid-view tab-pane fade in active clearfix">
                                        {loading ? <PacmanLoader/> : null}

                                        {products.map((product) => <ProductCard key={product.id}
                                                                                productId={product.id}
                                                                                name={product.name}
                                                                                price={product.price}/>)}
                                    </div>
                                </div>
                                <div className="row mt--60">
                                    <div className="col-md-12">
                                        <div className="htc__loadmore__btn">
                                            <a href="/#">load more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}
