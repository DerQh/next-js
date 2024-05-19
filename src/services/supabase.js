import { createClient } from "@supabase/supabase-js";

export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4b3N6ZHFneXpiZm1xaWN1a3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MzUxOTksImV4cCI6MjAyODUxMTE5OX0.LgNh1AdYWKbBa0wxQUAV2N7YlV1TAJHdDvi8-SdGQ40";
export const supabaseUrl = "https://txoszdqgyzbfmqicukwm.supabase.co";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// import { createClient } from "@supabase/supabase-js";
// export const supabaseUrl = "https://csskkpooqsegzhexyhvn.supabase.co";
// export const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzc2trcG9vcXNlZ3poZXh5aHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2OTU5MzEsImV4cCI6MjAxOTI3MTkzMX0.xsRY_jU0hL7dH2Zr9pzRUNQHa913wyvdW79_RIZjkLA";
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

// export const supabaseUrl =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4b3N6ZHFneXpiZm1xaWN1a3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MzUxOTksImV4cCI6MjAyODUxMTE5OX0.LgNh1AdYWKbBa0wxQUAV2N7YlV1TAJHdDvi8-SdGQ40";

// export const supabaseKey = "https://txoszdqgyzbfmqicukwm.supabase.co";

// export const supabaseUrl = "https://fknkfcsubdbbdspfajxz.supabase.co";
// export const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrbmtmY3N1YmRiYmRzcGZhanh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzI4MTcsImV4cCI6MjAyODI0ODgxN30.CuDMx4e8AwkjkSbWGdZ8_xjztJoqpH04ZonexYjwL0Q";
