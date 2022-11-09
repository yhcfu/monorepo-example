// @generated by protoc-gen-es v1.4.1 with parameter "target=ts"
// @generated from file example/hero/v1/hero.proto (package example.hero.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message example.hero.v1.HeroById
 */
export class HeroById extends Message<HeroById> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  constructor(data?: PartialMessage<HeroById>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "example.hero.v1.HeroById";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HeroById {
    return new HeroById().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HeroById {
    return new HeroById().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HeroById {
    return new HeroById().fromJsonString(jsonString, options);
  }

  static equals(a: HeroById | PlainMessage<HeroById> | undefined, b: HeroById | PlainMessage<HeroById> | undefined): boolean {
    return proto3.util.equals(HeroById, a, b);
  }
}

/**
 * @generated from message example.hero.v1.Hero
 */
export class Hero extends Message<Hero> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  constructor(data?: PartialMessage<Hero>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "example.hero.v1.Hero";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Hero {
    return new Hero().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Hero {
    return new Hero().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Hero {
    return new Hero().fromJsonString(jsonString, options);
  }

  static equals(a: Hero | PlainMessage<Hero> | undefined, b: Hero | PlainMessage<Hero> | undefined): boolean {
    return proto3.util.equals(Hero, a, b);
  }
}
