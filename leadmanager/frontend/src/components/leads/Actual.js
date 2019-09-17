import React, {Component} from 'react';
import { getLeads } from '../../actions/leads';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { FullTable } from '@n3/react-full-table';
import '@n3/react-full-table/dist/n3-react-full-table.css'

var isLoaded = false;


export class Actual extends Component{
    static propTypes = {
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired
    };
    componentDidMount() {
        isLoaded = true;
    }
    componentDidUpdate(){

    }
    render() {
        const data = this.props.leads;

        const columns = {
            id : {
                title: 'ID',
                target: '_blank',
                type: 'anchor',
                canDisable: false,
                getHref: ({id}) => 'http://127.0.0.1:8000/api/leads/' + id,
            },
            email: {
                title: 'email',
                canDisable: true,
            },
            name: {
                title: 'Name',
                canDisable: false
            },
            message: {
                title: 'message',
                canDisable: false
            },
            comment: {
                title: 'comment',
                canDisable: false
            },

        };
        const rootIds = ['id', 'name', 'email', 'message', 'comment'];
        function delay(ms) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, ms);
            });
        }
        const loadItemsFake = async (
           ) => {
            await delay(1);
            return {items: []}
        };

        const loadItems = async ({
        sort: {
          param: sortParam,
          asc: sortAsc
        }},{serializedValues}) => {
            await delay(1000);
            const parsedPerPage = serializedValues.perPage;
            const nameLover = serializedValues.name ? serializedValues.name.toLowerCase() : '';
            const sortedData = data.sort((item1, item2) => {
                const value1 = item1[sortParam];
                const value2 = item2[sortParam];
                if (value1 === value2){
                    return 0;
                }
                if (sortAsc === (value1 > value2)) {
                    return 1;
                }
                return -1;

            });
            const page = serializedValues.page || 1;
            const slicedData = parsedPerPage  // находим те записи которые должны быть на ЭТОЙ странице
                ? sortedData.slice(
                    (page - 1) * parsedPerPage,  // выбираем индекс с которого начинаем выборку ?
                    page * parsedPerPage, // тут видимо последний индекс
                )
                : sortedData;  // возвращаем сразу sortedData если мы находимся по дефолту на нужной странице и все уже распарсили
            return {
                items: slicedData,  // как итог возвращаем те записи которые отфильтровали и отсортировали на данной странице
                additional: {
                    count: sortedData.length,
                },
            };

        };
        if (isLoaded){
        return (
            <FullTable
            minColumnsNumber={3}
            top={30}
            fixedLeftCols={2}
            placeholder="Нет записей"
            columns={columns}
            rootIds={rootIds}
            perPageFilterName="perPage"
            loadItems={loadItems}
            appliedFilters = {
                {
                    perPage: 10
                }
            }
            />
        )}
        else {
            console.log('FAKE');
             return (
            <FullTable
            minColumnsNumber={3}
            top={30}
            fixedLeftCols={2}
            placeholder="Нет записей"
            columns={columns}
            rootIds={rootIds}
            perPageFilterName="perPage"
            loadItems={loadItemsFake}
            appliedFilters = {
                {
                    perPage: 10
                }
            }
            />
        )
        }

    }
}


const mapStateToProps = state => ({
    leads: state.leads.leads //state.leadReducer.leads <- leads is part of state
});


export default connect(mapStateToProps, {getLeads})(Actual);