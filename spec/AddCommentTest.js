import addComment from "./AddComment.js";
describe("Add comment tests", () =>  {

    beforeEach(() => {
        process.env.GITHUB_REPOSITORY = 'someactionowner/actionname';



    });
    describe("getOwnerAndRepo", () => {

        it("should return Owner And Repo", () => {

            const value = new addComment().getOwnerAndRepo()
            let obj = JSON.parse(JSON.stringify(value));
            expect(obj.owner).toBe("someactionowner");
        });


    });

    describe("addComment", () => {

        it("should return Owner And Repo", () => {

            const value = new addComment().getOwnerAndRepo()
            let obj = JSON.parse(JSON.stringify(value));
            expect(obj.owner).toBe("someactionowner");
        });


    });

});