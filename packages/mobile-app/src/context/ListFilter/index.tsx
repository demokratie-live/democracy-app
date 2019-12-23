import React, { createContext, useState } from 'react';
import { FilterData, filterData, FilterEntry } from './initData';
import { ProcedureFilter } from '../../../__generated__/globalTypes';

interface ListFilterInterface {
  filter: FilterData[];
  setFilter: (filter: FilterData[]) => void;
  proceduresFilter: ProcedureFilter;
}

const defaults: ListFilterInterface = {
  filter: filterData,
  setFilter: () => {
    throw new Error('ListFilterContext: setFilter function is not defined');
  },
  proceduresFilter: {},
};

export const ListFilterContext = createContext<ListFilterInterface>(defaults);

export const ListFilterProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = useState(filterData);
  const [proceduresFilter, setProceduresFilter] = useState({});

  const formatFilterdata = (data: FilterEntry[]) => {
    return data.reduce<string[]>((prev, { name: subtype, title, value }) => {
      if (value) {
        return [...prev, subtype || title];
      }
      return prev;
    }, []);
  };

  const getFilterPrepared = (rawData: FilterData[]) => {
    const filters: ProcedureFilter = {};
    rawData.forEach(({ name, data }) => {
      switch (name) {
        case 'activity':
          if (data.some(({ value }) => !value)) {
            filters.activity = formatFilterdata(data);
          }
          break;
        case 'type':
          if (data.some(({ value }) => !value)) {
            filters.type = formatFilterdata(data);
          }
          break;
        case 'subjectGroups':
          if (data.some(({ value }) => !value)) {
            filters.subjectGroups = formatFilterdata(data);
          }
          break;

        default:
          break;
      }
    });

    return filters;
  };

  const onSetFilter = (rawData: FilterData[]) => {
    setFilter(rawData);
    setProceduresFilter(getFilterPrepared(rawData));
  };

  return (
    <ListFilterContext.Provider
      value={{
        filter,
        setFilter: onSetFilter,
        proceduresFilter,
      }}>
      {children}
    </ListFilterContext.Provider>
  );
};
