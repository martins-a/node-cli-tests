
export const prompts = {
    someShots: {
        system: (progLanguage, progFramework, testFramework, externalContext) => `
                ${contexts.contextA(progLanguage, testFramework,  externalContext)}
                ${constraints.constraintA()}
                - Use the following examples for guidance about how to mock and assert:
                ${examples.samples1()}
            `
        ,
        user: (testedCode) => `
            ${tasks.taskA()}
            ${testedCode}
        `
    }
}

const constraints = {
    constraintA: () => `
            - You must output only the tests, do not output other information
            - Write clean and easy to understand code
    `
}

const examples = {
    samples1: () => `
        const userServiceMock = {
          getUser: jest.fn().mockReturnValue({ id: 1, name: 'Mock User' })
        };
        expect(userServiceMock.getUser(1)).toEqual({ id: 1, name: 'Mock User' });
        expect(userServiceMock.getUser).toHaveBeenCalledWith(1);
        
        TestBed.configureTestingModule({
          providers: [
            { provide: ProductService, useValue: { getProducts: jest.fn().mockReturnValue(['Teclado', 'Monitor']) } }
          ]
        });
        const productService = TestBed.inject(ProductService);
        expect(productService.getProducts()).toEqual(['Teclado', 'Monitor']);
        
        interface User { id: number; name: string; }
        const mockUser: User = { id: 42, name: 'Mocked User' };
        expect(mockUser.id).toBe(42);
        expect(mockUser.name).toMatch(/Mocked/);
        
        expect(10).toBe(10);
        expect('Angular').toEqual('Angular');
        expect({ id: 1 }).toEqual(expect.objectContaining({ id: 1 }));
        expect([1, 2, 3]).toContain(2);
        expect('TypeScript').toMatch(/Script$/);
        expect(undefined).toBeUndefined();
        expect(null).toBeNull();
        expect(true).toBeTruthy();
        expect(false).toBeFalsy();
        expect(() => { throw new Error('Erro!'); }).toThrow('Erro!');
        
        const apiServiceMock = {
          fetchData: jest.fn().mockResolvedValue({ status: 200, data: ['item1', 'item2'] })
        };
        const result = await apiServiceMock.fetchData();
        expect(result.data.length).toBe(2);
        expect(apiServiceMock.fetchData).toHaveBeenCalled();
    `
}

const contexts = {
    contextA: (progLanguage, testFramework, progFramework) => {
        return `
            Write unit tests following these instructions
            1) the programming language used is ${progLanguage}
            2) the test framework must be ${testFramework}
            3) the programming framework used is the code is ${progFramework}
        `
    }
}

const tasks = {
    taskA: () => {
        return `Write unit test for the following code:`
    }
}