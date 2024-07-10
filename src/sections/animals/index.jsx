import React from 'react';
import AnimalsTable from '../animals-table/view/animal-table-view';
import CategoryModal from './addNewCategoryModal';
import Categories from './Categories';

function AnimalsView() {
  return (
    <>
      <div className="flex flex-col gap-5 items-end my-5 mx-2  md:mx-40">
        <CategoryModal />
        <div className="flex flex-row gap-8 w-full">
          <Categories />
        </div>

        <AnimalsTable />
      </div>
    </>
  );
}

export default AnimalsView;
