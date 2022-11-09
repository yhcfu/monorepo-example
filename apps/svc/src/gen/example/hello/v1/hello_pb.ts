// @generated by protoc-gen-es v1.4.1 with parameter "target=ts"
// @generated from file example/hello/v1/hello.proto (package example.hello.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message example.hello.v1.HelloQuery
 */
export class HelloQuery extends Message<HelloQuery> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  constructor(data?: PartialMessage<HelloQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "example.hello.v1.HelloQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HelloQuery {
    return new HelloQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HelloQuery {
    return new HelloQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HelloQuery {
    return new HelloQuery().fromJsonString(jsonString, options);
  }

  static equals(a: HelloQuery | PlainMessage<HelloQuery> | undefined, b: HelloQuery | PlainMessage<HelloQuery> | undefined): boolean {
    return proto3.util.equals(HelloQuery, a, b);
  }
}

/**
 * @generated from message example.hello.v1.HelloResponse
 */
export class HelloResponse extends Message<HelloResponse> {
  /**
   * @generated from field: string msg = 1;
   */
  msg = "";

  constructor(data?: PartialMessage<HelloResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "example.hello.v1.HelloResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "msg", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HelloResponse {
    return new HelloResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HelloResponse {
    return new HelloResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HelloResponse {
    return new HelloResponse().fromJsonString(jsonString, options);
  }

  static equals(a: HelloResponse | PlainMessage<HelloResponse> | undefined, b: HelloResponse | PlainMessage<HelloResponse> | undefined): boolean {
    return proto3.util.equals(HelloResponse, a, b);
  }
}

