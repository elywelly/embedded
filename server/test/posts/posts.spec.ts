import axios from "axios";
import nock from "nock";

describe('test post controller', () => {
    
    it('should get only post for specified user with userid', async () => {
        const getAllUserPosts = async () => {
            const res = await axios.get(`https://api.example.com/api/posts/1`);
            const data = res.data;
            return data;
         }
         
        nock("https://api.example.com/")
            .get('/api/posts/1')
            .reply(200, { 
                data: [
                    { 
                        id: 10,
                        user_id: 1, 
                        link: '<iframe>',
                        created_at: '2022-04-15'
                    }, 
                    {
                        id: 11,
                        user_id: 1, 
                        link: '<iframe>',
                        created_at: '2022-04-16'
                    },
            ]
            });
        const response = await getAllUserPosts();
        expect(response.data).toEqual([
            { 
                id: 10,
                user_id: 1, 
                link: '<iframe>',
                created_at: '2022-04-15'
            }, 
            {
                id: 11,
                user_id: 1, 
                link: '<iframe>',
                created_at: '2022-04-16'
            },
    ])
    })

    it('should create user post succesfully', async () => {
        const createBody = {
            user_id: 2,
            link: '<iframe>'
        }   

        const createPost = async () => {
            const res = await axios.post(`https://api.example.com/api/posts/create`, createBody);
            const data = res.data;
            return data;
         }

         nock("https://api.example.com/")
         .post('/api/posts/create', createBody)
         .reply(200, createBody);

        const response = await createPost();
        expect(response).toEqual(createBody);
        
    });
})
