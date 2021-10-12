module.exports = new class SchemaValidator {
  validate({payload, schema}) {
    const payloadProperties = Object.keys(payload)

    const validatedSchema = payloadProperties.reduce((validatedPayload, property) => {
      if (schema.hasOwnProperty(property) && typeof payload[property] === schema[property]) {
        validatedPayload[property] = payload[property];
      }

      return validatedPayload
    }, {});

    return validatedSchema;
  }

  hasAllProperties({payload, schema}) {
    const requiredKeys = Object.keys(schema);

    const missingKeys = requiredKeys.reduce((missingKeys, key) => {
      if (!payload.hasOwnProperty(key)) missingKeys.push(key)

      return missingKeys;
    }, [])

    if (missingKeys.length) throw new Error(`Missing fields ${missingKeys}`)
  }
}


// Validar schema - OK
// Validar tipos - OK
// Validar se tem todas as propriedades do schema - Pendente
// Retornar mensagem com chaves faltantes - Pendente
