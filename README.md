# Api - Node Tesis

Api - Node Tesis

## Instalación

Para comenzar con este proyecto, sigue los siguientes pasos:

1. Clona el repositorio en tu máquina local:

   ```
       git clone https://github.com/Brav2001/api-node-tesis
   ```

2. Navega al directorio del proyecto:

   ```
       cd <RUTA>
   ```

3. Instala las dependencias del proyecto utilizando npm (asegúrate de tener Node.js instalado previamente):

   ```
       npm i
   ```

## USO

Una vez que hayas instalado las dependencias, puedes ejecutar el proyecto con el siguiente comando:

        npm run dev

## Contribuciones

Para contribuir al proyecto, sigue estos pasos:

1. Crea una rama (branch) local para tus cambios:

```
    git checkout -b nombre-de-tu-rama
```

2. Realiza tus cambios y asegúrate de que todo funcione correctamente.

3. Realiza un commit de tus cambios:

   ```
       git commit -m "Descripción de tus cambios"
   ```

4. Sube tus cambios a tu repositorio remoto:
   ```
       git push origin nombre-de-tu-rama
   ```

## Endpoints

### AuthStaff

- Login

  - Route: `/authStaff/login`
  - Method: `POST`
  - Request:

    ```
    {
        "email": [EMAIL],
        "password": [PASSWORD]
    }
    ```

  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
          "token": [TOKEN]
      }
      ```

    - FAIL:

      status: `401`

      json:

      ```
      {
          "error": {
              "message": "Invalid username or password."
          }
      }
      ```

- Register

  - Route: `/authStaff/register`
  - Method: `POST`
  - Request:

    ```
    {
        "email": [EMAIL],
        "name": [NAME],
        "lastName": [LASTNAME],
        "phone": [PHONE],
        "rol": ["ADMIN", "COURIER", "PACKER"]
    }
    ```

  - Response:

    - OK:

      status: `201`

      json:

      ```
      {
          "id": [ID]
      }
      ```

    - FAIL:

      status: `409`

      json:

      ```
      {
          "error": {
              "message": "An error has ocurred."
          }
      }
      ```

- Verify Token

  - Route: `/authStaff/verify-token`
  - Method: `GET`
  - Request Headers:

    ```
    {
        "auth-token": [TOKEN]
    }
    ```

  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "message": "Token valido"
      }
      ```

    - FAIL:

      status: `401`

      json:

      ```
      {
        "error": "Unauthorized. No token provided."
      }
      ```

    - FAIL:

      status: `401`

      json:

      ```
      {
        "Token inválido o expirado."
      }
      ```

### Aisle

- Create Aisle

  - Route: `/aisle/createAisle`
  - Method: `POST`
  - Request:

    ```
    {
        "number": [AISLE_NUMBER]
    }
    ```

  - Response:

    - OK:

      status: `201`

      json:

      ```
      {
        "data": {
            "id": [AISLE_ID],
            "number": [AISLE_NUMBER],
            "createdAt": [CREATED_AT],
            "updatedAt": [UPDATED_AT]
        }
      }
      ```

    - FAIL:

      status: `400`

      json:

      ```
      {
        "error": [ERROR_DETAILS]
      }
      ```

    - FAIL:

      status: `409`

      json:

      ```
      {
        "error": {
            "message": "An error has ocurred."}
      }
      ```

- Get All Aisles

  - Route: `/aisle/getAllAisles`
  - Method: `GET`

  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "data": [
            {
                "id": [AISLE_ID],
                "number": [AISLE_NUMBER],
                "createdAt": [CREATED_AT],
                "updatedAt": [UPDATED_AT]
            },
            ...
        ]
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Error getting aisles"
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

- Delete Aisle

  - Route: `/aisle/deleteAisle/:number`
  - Method: `DELETE`
  - Request Parameters:

    ```
    {
        "number": [AISLE_NUMBER]
    }
    ```

  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "message": "Aisle successfully removed"
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Failed to delete aisle. It may not exist."
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

- Get All Data Aisle

  - Route: `/aisle/getAllDataAisle`
  - Method: `GET`
  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "data": [
            {
                "id": [AISLE_ID],
                "number": [AISLE_NUMBER],
                "createdAt": [CREATED_AT],
                "updatedAt": [UPDATED_AT],
                "Shelves": [
                    {
                        "id": [SHELVE_ID],
                        "aisleId": [AISLE_ID],
                        "createdAt": [CREATED_AT],
                        "updatedAt": [UPDATED_AT],
                        "Levels": [
                            {
                                "id": [LEVEL_ID],
                                "shelveId": [SHELVE_ID],
                                "createdAt": [CREATED_AT],
                                "updatedAt": [UPDATED_AT]
                            }
                        ]
                    }
                ]
            },
            ...
        ]
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Error getting aisles"
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

### Basket

- Create Basket

  - Route: `/basket/createBasket`
  - Method: `POST`
  - Request:

    ```
    {
      "levelId": [LEVEL_ID],
      "weight": [WEIGHT],
      "productId": [PRODUCT_ID],
      "productState": [PRODUCT_STATE],
      "expiration": [EXPIRATION_DATE]
    }
    ```

  - Response:

    - OK:

      status: `201`

      json:

      ```
      {
        "data": {
            "id": [BASKET_ID],
            "levelId": [LEVEL_ID],
            "weight": [WEIGHT],
            "productId": [PRODUCT_ID],
            "productState": [PRODUCT_STATE],
            "expiration": [EXPIRATION_DATE],
            "createdAt": [CREATED_AT],
            "updatedAt": [UPDATED_AT]
        }
      }
      ```

    - FAIL:

      status: `400`

      json:

      ```
      {
        "error": {
          "message": [VALIDATION_ERROR_MESSAGE]
        }
      }
      ```

    - FAIL:

      status: `409`

      json:

      ```
      {
        "error": {
          "message": "An error has ocurred."}
      }
      ```

- Update Basket

  - Route: `/basket/updateBasket/:id`
  - Method: `PUT`
  - Request:

    ```
    {
      "weight": [WEIGHT],
      "productState": [PRODUCT_STATE],
      "expiration": [EXPIRATION_DATE]
    }
    ```

  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "data": {
            "id": [BASKET_ID],
            "levelId": [LEVEL_ID],
            "weight": [WEIGHT],
            "productId": [PRODUCT_ID],
            "productState": [PRODUCT_STATE],
            "expiration": [EXPIRATION_DATE],
            "number": [AISLE_NUMBER],
            "createdAt": [CREATED_AT],
            "updatedAt": [UPDATED_AT]
          }
      }
      ```

    - FAIL:

      status: `400`

      json:

      ```
      {
        "error": [VALIDATION_ERROR_MESSAGE]
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Basket not found"
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

- Get All Baskets

  - Route: `/basket/getAll`
  - Method: `POST`
  - Response:

    - OK:
      status: `200`
      json:

      ```
      {
        "data": [
          {
            "id": [BASKET_ID],
            "levelId": [LEVEL_ID],
            "weight": [WEIGHT],
            "productId": [PRODUCT_ID],
            "productState": [PRODUCT_STATE],
            "expiration": [EXPIRATION_DATE],
            "createdAt": [CREATED_AT],
            "updatedAt": [UPDATED_AT]
          },
          ...
        ]
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Error getting baskets"
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

- Get One Basket

  - Route: `/basket/getOneBasket/:id`
  - Method: `GET`
  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "data": {
          "id": [BASKET_ID],
          "levelId": [LEVEL_ID],
          "weight": [WEIGHT],
          "productId": [PRODUCT_ID],
          "productState": [PRODUCT_STATE],
          "expiration": [EXPIRATION_DATE],
          "createdAt": [CREATED_AT],
          "updatedAt": [UPDATED_AT],
        }
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Failed to get basket. It may not exist."
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

- Delete Basket

  - Route: `/basket/deleteBasket/:id`
  - Method: `DELETE`
  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "message": "Basket successfully removed"
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Failed to delete basket. It may not exist."
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

### Level

- Create Level

  - Route: `/level/createLevel`
  - Method: `POST`
  - Request:

    ```
    {
      "numberAmount": [NUMBER_AMOUNT],
      "numberLevel": [NUMBER_LEVEL],
      "shelveId": [SHELVE_ID]
    }
    ```

  - Response:

    - OK:

      status: `201`

      json:

      ```
      {
        "data": {
            "id": [LEVEL_ID],
            "amount": [NUMBER_AMOUNT],
            "number": [NUMBER_LEVEL],
            "ShelveId": [SHELVE_ID],
            "createdAt": [CREATED_AT],
            "updatedAt": [UPDATED_AT]
        }
      }
      ```

    - FAIL:

      status: `400`

      json:

      ```
      {
        "error": {
          "message": [VALIDATION_ERROR]
        }
      }
      ```

    - FAIL:

      status: `409`

      json:

      ```
      {
        "error": {
          "message": "An error has occurred."}
      }
      ```

- Get All Levels

  - Route: `/level/getAll`
  - Method: `GET`
  - Response:

    - OK:
      status: `200`
      json:

      ```
      {
        "data": [
          {
            "id": [LEVEL_ID],
            "amount": [NUMBER_AMOUNT],
            "number": [NUMBER_LEVEL],
            "ShelveId": [SHELVE_ID],
            "createdAt": [CREATED_AT],
            "updatedAt": [UPDATED_AT]
          },
          ...
        ]
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Error getting levels"
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

- Get One Level

  - Route: `/level/getOneLevel/:id`
  - Method: `GET`
  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "data": {
          "id": [LEVEL_ID],
          "amount": [NUMBER_AMOUNT],
          "number": [NUMBER_LEVEL],
          "ShelveId": [SHELVE_ID],
          "createdAt": [CREATED_AT],
          "updatedAt": [UPDATED_AT],
        }
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Failed to get level. It may not exist."
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

- Delete Level

  - Route: `/level/deleteLevel/:id`
  - Method: `DELETE`
  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "message": "Level successfully removed"
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Failed to delete level. It may not exist."
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

### Product

- Create Product

  - Route: `/product/createProduct`
  - Method: `POST`
  - Request:

    ```
    {
      "name": [NAME]
    }
    ```

  - Response:

    - OK:

      status: `201`

      json:

      ```
      {
        "data": [
          "data": [PRODUCT_DATA]
        ]
      }
      ```

    - FAIL:

      status: `400`

      json:

      ```
      {
        "error": [VALIDATION_ERROR]
      }
      ```

    - FAIL:

      status: `409`

      json:

      ```
      {
        "error": {
          "message": "An error has occurred."}
      }
      ```

- Get All Products

  - Route: `/product/getAll`
  - Method: `GET`
  - Response:

    - OK:
      status: `200`
      json:

      ```
      {
        "data": [
          {
            "id": "product-id-1",
            "name": "ProductName-1"
          },
          {
            "id": "product-id-2",
            "name": "ProductName2",
          }
          ...
        ]
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Error getting products"
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

- Delete Level

  - Route: `/product//deleteProduct/:name`
  - Method: `DELETE`
  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "message": "Product successfully removed"
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Failed to delete product. It may not exist."
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

### Shelve

- Create Shelve

  - Route: `/shelve/createShelve`
  - Method: `POST`
  - Request:

    ```
    {
      "numberAisle": [AISLE_NUMBER],
      "numberShelve": [SHELVE_NUMBER]
    }
    ```

  - Response:

    - OK:

      status: `201`

      json:

      ```
      {
        "data": {
          "id": [SHELVE_ID],
          "number": [SHELVE_NUMBER],
          "AisleId": [AISLE_ID],
          "createdAt": [TIMESTAMP],
          "updatedAt": [TIMESTAMP]
        }
      }
      ```

    - FAIL:

      status: `400`

      json:

      ```
      {
        "error": {
          "message": [VALIDATION_ERROR_MESSAGE]
        }
      }
      ```

    - FAIL:

      status: `409`

      json:

      ```
      {
        "error": {
          "message": "An error has occurred."}
      }
      ```

- Get One Shelve

  - Route: `/shelve/getOneShelve`
  - Method: `GET`
  - Request:

    ```
    {
      "numberAisle": [AISLE_NUMBER],
      "numberShelve": [SHELVE_NUMBER]
    }
    ```

  - Response:

    - OK:
      status: `200`
      json:

      ```
      {
        "data": {
          "id": [SHELVE_ID],
          "number": [SHELVE_NUMBER],
          "AisleId": [AISLE_ID],
          "createdAt": [TIMESTAMP],
          "updatedAt": [TIMESTAMP]
        }
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Failed to get shelve. It may not exist."
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

- Get All Shelves for One Aisle

  - Route: `/shelve/getAllShelveToOneAisle/:number`
  - Method: `GET`
  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "data": [
          {
            "id": [SHELVE_ID],
            "number": [SHELVE_NUMBER],
            "AisleId": [AISLE_ID],
            "createdAt": [TIMESTAMP],
            "updatedAt": [TIMESTAMP]
          }
        ],
        ...
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Failed to get shelves. It may not exist."
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

- Delete Level

  - Route: `/shelve//deleteShelve`
  - Method: `DELETE`
  - Request:

    ```
    {
      "numberAisle": [AISLE_NUMBER],
      "numberShelve": [SHELVE_NUMBER]
    }
    ```

  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "message": "Shelve  successfully removed"
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Failed to delete shelve. It may not exist."
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```

### Type

- Create Type

  - Route: `/type/createType`
  - Method: `POST`
  - Request:

    ```
    {
      "name": [TYPE_NAME]
    }
    ```

  - Response:

    - OK:

      status: `201`

      json:

      ```
      {
        "data": {
          "id": [TYPE_ID],
          "name": [TYPE_NAME],
          "createdAt": [TIMESTAMP],
          "updatedAt": [TIMESTAMP]
        }
      }
      ```

    - FAIL:

      status: `400`

      json:

      ```
      {
        "error": {
          "message": [VALIDATION_ERROR_MESSAGE]
        }
      }
      ```

    - FAIL:

      status: `409`

      json:

      ```
      {
        "error": {
          "message": "An error has occurred."}
      }
      ```

- Get All Types

  - Route: `/type/getAll`
  - Method: `GET`
  - Response:

    - OK:
      status: `200`
      json:

      ```
      [
        {
          "id": [TYPE_ID],
          "name": [TYPE_NAME],
          "createdAt": [TIMESTAMP],
          "updatedAt": [TIMESTAMP]
        },
        ...
      ]
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Error getting types"
      }
      ```

- Delete Type

  - Route: `/type/deleteType/:name`
  - Method: `DELETE`
  - Response:

    - OK:

      status: `200`

      json:

      ```
      {
        "message": "Type   successfully removed"
      }
      ```

    - FAIL:

      status: `404`

      json:

      ```
      {
        "error": "Failed to delete type. It may not exist."
      }
      ```

    - FAIL:

      status: `500`

      json:

      ```
      {
        "error": "Internal server error"
      }
      ```
