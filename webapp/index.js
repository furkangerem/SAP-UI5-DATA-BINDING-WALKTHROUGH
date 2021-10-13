sap.ui.require([
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/BindingMode",
    "sap/ui/model/resource/ResourceModel"
], function (Text, JSONModel, XMLView, BindingMode, ResourceModel) {
    "use strict";

    var oProductModel = new JSONModel(); // Boş bir oProductModel adında JSON Model objesi oluşturduk.
    oProductModel.loadData("./model/Products.json"); // Daha sonra verileri "loadData("verininAdresiniBelirt")" metoduyla içeriye aktardık.
    sap.ui.getCore().setModel(oProductModel, "products"); // Modeli global olarak ayarladık ki XML dosyamızda erişebilelim. Ayrıca, "products" diye bir takma adı da verdik ki ulaşmamız daha kolay olsun.

    // Attach an anonymous function to the SAPUI5 'init' event
    sap.ui.getCore().attachInit(function () {
        // Create a JSON model from an object literal
        var oModel = new JSONModel({

            firstName: "Harry",
            lastName: "Hawk",
            enabled: true,
            panelHeaderText: "Data Binding Basics",
            address: {
                street: "Dietmar-Hopp-Allee 16",
                city: "Walldorf",
                zip: "69190",
                country: "Germany"
            },
            salesAmount: 12345.6789,
            priceThreshold: 20,
            currencyCode: "EUR"

            // greetingText: "Hi, my name is Harry Hawk" // oModel diye bir JSON objesi oluşturduk ve içerisindeki data ise "greetingText" olmuş oldu.
        });

        // oModel.setDefaultBindingMode(BindingMode.OneWay); // Tek yönlü olduğunu belirttiğimizde sadece ekrana data getirmesini bekleriz. Bu nedenle, "enable" tuşu çalışmaz.

        // Assign the model object to the SAPUI5 core
        sap.ui.getCore().setModel(oModel); // "this" anahtar kelimesi olmadığı için bu oModel tüm her yerde (global) tanımlanmış oldu.
        // this.getView().setModel(oModel); Eğer spesifik bir view üzerinde çalışacak olsaydık bunu kullanırdık çünkü datanın sadece bu viewda özel olduğunu belirtmemiz gerekirdi.

        // i18n kütüphanesinin oResourceModel olarak tanımını yapıyoruz. 
        // Create a resource bundle for language specific texts
        // the configured supportedLocales represent the i18n files present:
        // * "" - i18n/i18n.properties
        // the configured fallbackLocale should represent one of these files
        // * "" - according to the fallback chain the root bundle is the last fallback.
        //   Configuring it explicitly avoids side effects when additional resource files are added.
        var oResourceModel = new ResourceModel({
            bundleName: "sap.ui.demo.db.i18n.i18n",
            supportedLocales: ["", "de"],
            fallbackLocale: ""
        });

        // Tüm her yerden erişebilinmesini sağlamak için de "global" olarak sisteme tanımladık.
        // Assign the model object to the SAPUI5 core using the name "i18n"
        sap.ui.getCore().setModel(oResourceModel, "i18n");


        // Display a text element whose text is derived from the model object
        // Süslü parantez içerisinde eğik çizgi ile yukarıdaki JSON Modelimizdeki nesnemiz olan "greetingText" komutuna eriştik ve çağırabildik.
        // new Text({ text: "{/greetingText}" }).placeAt("content");

        // Display the XML view called "App"
        var oView = new XMLView({
            viewName: "sap.ui.demo.db.view.App"
        });

        // Register the view with the message manager
        sap.ui.getCore().getMessageManager().registerObject(oView, true);

        // Insert the view into the DOM
        oView.placeAt("content");

    });
});
