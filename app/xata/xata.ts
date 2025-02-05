// Generated by Xata Codegen 0.30.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "resume-table",
    checkConstraints: {
      "resume-table_xata_id_length_xata_id": {
        name: "resume-table_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      "_pgroll_new_resume-table_xata_id_key": {
        name: "_pgroll_new_resume-table_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "resume",
        type: "multiple",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "wallet",
        type: "multiple",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type ResumeTable = InferredTypes["resume-table"];
export type ResumeTableRecord = ResumeTable & XataRecord;

export type DatabaseSchema = {
  "resume-table": ResumeTableRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Logan-Clemons-s-workspace-hnpk5n.us-east-1.xata.sh/db/talent-vault",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
