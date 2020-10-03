export const initCategories = (categories, withSub = false) => {
    const categoriesOptions = [];
    // For MultiSelect
    // Array.isArray(categories) && categories.map(item => {
    //     const category = {
    //         value: item?.id,
    //         key: item?.id,
    //         title: item?.title,
    //     };
    //     if (item?.subCategories?.length){
    //         category.children=[];
    //         item.subCategories.forEach(sub => {
    //             category.children.push({
    //                 value: sub?.id,
    //                 title: sub?.title,
    //             })
    //         })
    //     }
    //     categoriesOptions.push(category);
    // });

    Array.isArray(categories) && categories.map(item => {
        categoriesOptions.push({id: item?.id, name: item?.title});
        return  withSub && item?.subCategories && item.subCategories.forEach(sub => {
            categoriesOptions.push({id: sub?.id, name: sub?.title, child: true})
        })
    });
    return categoriesOptions;
};
