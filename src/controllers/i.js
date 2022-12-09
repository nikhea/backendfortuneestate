export const createProperties = async (req, res, next) => {
    const CountryName = req.params.name;
    const p = new RegExp("^" + CountryName + "$", "i");
    console.log(p);
    try {
      const country = await Countries.findOne({ name: p });
      console.log(country);
      if (country) {
        const Property = new Properties({
          title: req.body.title,
          pageTitle: req.body.pageTitle,
          description: req.body.description,
          category: req.body.category,
          propertyType: req.body.propertyType,
          listingType: req.body.listingType,
          view: req.body.view,
          price: req.body.price,
          priceSymbol: req.body.priceSymbol,
          bedrooms: req.body.bedrooms,
          bathrooms: req.body.bathrooms,
          halfBathrooms: req.body.halfBathrooms,
          squareFootage: req.body.squareFootage,
          squareSymbol: req.body.squareSymbol,
          yearBuilt: req.body.yearBuilt,
          lotArea: req.body.lotArea,
          lotAreaSymbol: req.body.lotAreaSymbol,
          images: req.body.images,
          image: req.body.image,
          address: {
            country: CountryName,
            street: req.body.street,
            city: req.body.city,
          },
          websiteCopy: {
            webSiteURL: req.body.webSiteURL,
            webSiteName: req.body.webSiteName,
          },
          country: country._id,
        });
        const property = await Property.save();
        //   continent.countries.push(countrys);
        country.properties.push(property);
        await country.save();
        let response = {
          success: "true",
          statuscode: 200,
          data: property,
          message: "success",
        };
        res.json(response);
      }
    } catch (error) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "something failed",
      };
      return res.json(response);
    }
  };