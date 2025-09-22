import { test, expect } from "@playwright/test";

test.describe("GET /api/companies/count", () => {
  test("should return total number of companies without filters", async ({
    request,
  }) => {
    const res = await request.get("/api/companies/count");
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty("total");
    expect(body.total).toBeGreaterThan(0); // should have companies
  });

  test("should return smaller number when filtering by name (e.g., Microsoft)", async ({
    request,
  }) => {
    const resAll = await request.get("/api/companies/count");
    const allBody = await resAll.json();

    const resFiltered = await request.get(
      "/api/companies/count?name=Microsoft"
    );
    const filteredBody = await resFiltered.json();

    expect(filteredBody.total).toBeLessThanOrEqual(allBody.total);
  });

  test("should return 0 when filtering by non-existing company", async ({
    request,
  }) => {
    const res = await request.get(
      "/api/companies/count?name=NonExistingCompany123"
    );
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.total).toBe(0);
  });
});

test.describe("GET /api/companies/top-paid", () => {
  const endpoint = "/api/companies/top-paid";

  test("should return max 5 items by default", async ({ request }) => {
    const res = await request.get(endpoint);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(Array.isArray(body.items)).toBeTruthy();
    expect(body.items.length).toBeLessThanOrEqual(5);
  });

  test("should return list sorted by salaryBand.base in descending order", async ({
    request,
  }) => {
    const res = await request.get(endpoint);
    const body = await res.json();

    const salaries = body.items.map((c) => c.salaryBand?.base ?? 0);

    // check descending
    for (let i = 0; i < salaries.length - 1; i++) {
      expect(salaries[i]).toBeGreaterThanOrEqual(salaries[i + 1]);
    }
  });

  test("should respect limit parameter (e.g., limit=10)", async ({
    request,
  }) => {
    const res = await request.get(`${endpoint}?limit=10`);
    const body = await res.json();

    expect(body.items.length).toBeLessThanOrEqual(10);
  });
});

test.describe("GET /api/companies/by-skill/:skill", () => {
  const endpoint = "/api/companies/by-skill";

  test("should return companies that include the skill in hiringCriteria.skills", async ({
    request,
  }) => {
    const skill = "DSA";
    const res = await request.get(`${endpoint}/${skill}`);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(Array.isArray(body.items)).toBeTruthy();

    // Ensure all companies returned have the skill
    for (const company of body.items) {
      expect(company.hiringCriteria?.skills).toContain(skill);
    }
  });

  test("should work case-insensitively (DSA vs dsa)", async ({ request }) => {
    const resUpper = await request.get(`${endpoint}/DSA`);
    const resLower = await request.get(`${endpoint}/dsa`);

    const bodyUpper = await resUpper.json();
    const bodyLower = await resLower.json();

    // Compare lengths
    expect(bodyUpper.items.length).toBe(bodyLower.items.length);

    // Optionally compare company IDs/names
    const idsUpper = bodyUpper.items.map((c) => c._id);
    const idsLower = bodyLower.items.map((c) => c._id);
    expect(idsUpper.sort()).toEqual(idsLower.sort());
  });

  test("should return empty array for non-existing skill", async ({
    request,
  }) => {
    const res = await request.get(`${endpoint}/nonExistingSkillXYZ`);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body.items.length).toBe(0);
  });
});

test.describe("GET /api/companies/by-location/:location", () => {
  const endpoint = "/api/companies/by-location";

  test("should return companies whose location matches the given parameter", async ({
    request,
  }) => {
    const location = "Bangalore";
    const res = await request.get(`${endpoint}/${location}`);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(Array.isArray(body.items)).toBeTruthy();

    // Check every returned company has the requested location (case-insensitive match)
    for (const company of body.items) {
      expect(company.location.toLowerCase()).toBe(location.toLowerCase());
    }
  });

  test("should work case-insensitively (Hyderabad vs hyderabad)", async ({
    request,
  }) => {
    const resUpper = await request.get(`${endpoint}/Hyderabad`);
    const resLower = await request.get(`${endpoint}/hyderabad`);

    const bodyUpper = await resUpper.json();
    const bodyLower = await resLower.json();

    // Compare lengths
    expect(bodyUpper.items.length).toBe(bodyLower.items.length);

    // Optionally compare IDs/names to confirm exact same companies
    const idsUpper = bodyUpper.items.map((c) => c._id);
    const idsLower = bodyLower.items.map((c) => c._id);
    expect(idsUpper.sort()).toEqual(idsLower.sort());
  });

  test("should return empty array for non-existing location", async ({
    request,
  }) => {
    const res = await request.get(`${endpoint}/NowhereCityXYZ`);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body.items.length).toBe(0);
  });
});

test.describe("GET /api/companies/headcount-range", () => {
  const endpoint = "/api/companies/headcount-range";

  test("should return companies with headcount >= min when only min is given", async ({
    request,
  }) => {
    const min = 1000;
    const res = await request.get(`${endpoint}?min=${min}`);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(Array.isArray(body.items)).toBeTruthy();

    for (const company of body.items) {
      expect(company.employeeCount).toBeGreaterThanOrEqual(min);
    }
  });

  test("should return companies with headcount between min and max when both are provided", async ({
    request,
  }) => {
    const min = 1000;
    const max = 5000;
    const res = await request.get(`${endpoint}?min=${min}&max=${max}`);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(Array.isArray(body.items)).toBeTruthy();

    for (const company of body.items) {
      expect(company.employeeCount).toBeGreaterThanOrEqual(min);
      expect(company.employeeCount).toBeLessThanOrEqual(max);
    }
  });

  test("should handle invalid input (e.g., min=abc) gracefully", async ({
    request,
  }) => {
    const res = await request.get(`${endpoint}?min=abc`);
    // Either expect 400 OR fallback behavior
    if (res.status() === 400) {
      const body = await res.json();
      expect(body.error).toBeDefined();
    } else {
      // fallback: default min=0
      const body = await res.json();
      expect(Array.isArray(body.items)).toBeTruthy();
      for (const company of body.items) {
        expect(company.employeeCount).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

test.describe("GET /api/companies/benefit/:benefit", () => {
  const endpoint = "/api/companies/benefit";

  test("should return companies that list the given benefit", async ({
    request,
  }) => {
    const benefit = "Relocation";
    const res = await request.get(`${endpoint}/${benefit}`);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(Array.isArray(body.items)).toBeTruthy();

    for (const company of body.items) {
      const companyBenefits = company.benefits.map((b) => b.toLowerCase());
      expect(companyBenefits).toContain(benefit.toLowerCase());
    }
  });

  test('should work with partial match (e.g., Insurance matches "Health Insurance")', async ({
    request,
  }) => {
    const benefit = "Insurance";
    const res = await request.get(`${endpoint}/${benefit}`);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(Array.isArray(body.items)).toBeTruthy();

    for (const company of body.items) {
      const match = company.benefits.some((b) =>
        b.toLowerCase().includes(benefit.toLowerCase())
      );
      expect(match).toBeTruthy();
    }
  });

  test("should work case-insensitively", async ({ request }) => {
    const resUpper = await request.get(`${endpoint}/WFH`);
    const resLower = await request.get(`${endpoint}/wfh`);

    const bodyUpper = await resUpper.json();
    const bodyLower = await resLower.json();

    expect(bodyUpper.items.length).toBe(bodyLower.items.length);

    const idsUpper = bodyUpper.items.map((c) => c._id);
    const idsLower = bodyLower.items.map((c) => c._id);
    expect(idsUpper.sort()).toEqual(idsLower.sort());
  });

  test("should return empty array if no company offers the benefit", async ({
    request,
  }) => {
    const res = await request.get(`${endpoint}/SpaceTravelAllowanceXYZ`);
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body.items.length).toBe(0);
  });
});